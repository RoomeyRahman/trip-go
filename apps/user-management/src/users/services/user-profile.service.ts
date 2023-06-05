import {
  Injectable,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser, IUserProfile, IPaginateUserProfile } from '../interfaces';
import {
  CreateUserProfileDTO,
  UserProfileDTO,
  SearchUserProfileDTO,
} from '../dto';
import { createSearchQuery } from 'libs/shared/src/utils/helper';
import { USER, USER_PROFILE } from '../schemas';

@Injectable()
export class UserProfileService {
  private AWS_SERVICE_IMG_FOLDER = 'UserProfileImage';
  private AWS_SERVICE_RESUME_FOLDER = 'UserProfileResume';
  /**
   * Constructor
   * @param {Model<IUserProfile>} userProfileModel
   * @param {Model<IUser>} userModel
   * @param {service<FilesService>} filesService
   */
  constructor(
    @InjectModel(USER_PROFILE)
    private readonly userProfileModel: Model<IUserProfile>,
    @InjectModel(USER)
    private readonly userModel: Model<IUser>,
  ) {}

  /**
   * Create a user profile
   * @param {IUser} user
   * @param {CreateUserProfileDTO} createUserProfileDTO
   * @returns {Promise<IUserProfile>}
   */
  create(
    user: IUser,
    createUserProfileDTO: CreateUserProfileDTO,
  ): Promise<IUserProfile> {
    try {
      const userProfileDTO = new UserProfileDTO();
      userProfileDTO.user = user._id;
      userProfileDTO.cBy = user._id;
      const setUserProfile = { ...userProfileDTO, ...createUserProfileDTO };
      const registerDoc = new this.userProfileModel(setUserProfile);
      return registerDoc.save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * find user profile
   * @param {string} id
   * @param {string} slug
   * @param {string} userId
   * @returns {Promise<IUserProfile>}
   */
  async findOne(
    id?: string,
    slug?: string,
    userId?: string,
  ): Promise<IUserProfile> {
    try {
      const searchQuery: any = {};
      if (!id && !slug && !userId) {
        return Promise.reject(
          new BadRequestException('Either id or slug or userId is required!'),
        );
      }
      if (id) searchQuery._id = id;
      if (slug) searchQuery.slug = slug;
      if (userId) searchQuery.user = userId;
      return this.userProfileModel
        .findOne(searchQuery)
        .populate({
          path: 'user',
          select: {
            email: 1,
            mobile: 1,
            isActive: 1,
            isVerified: 1,
            isSuperAdmin: 1,
            isAdmin: 1,
          },
        })
        .lean()
        .exec();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find All user profile
   * @returns {Promise<IPaginateUserProfile>}
   */
  async findAll(query: SearchUserProfileDTO): Promise<IPaginateUserProfile> {
    try {
      let sortQuery: any = { $natural: -1 };
      const searchQuery = createSearchQuery(query);
      const limit: number = (query && query.limit) || 10;
      const skip: number = (query && query.skip) || 0;

      if (query.hasOwnProperty('sort') && query.sort) {
        sortQuery = JSON.parse(query.sort);
      }

      if (
        query.hasOwnProperty('distance') &&
        query.hasOwnProperty('lat') &&
        query.hasOwnProperty('lng')
      ) {
        sortQuery = '';
        searchQuery['location.coordinates'] = {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [query.lat, query.lng],
            },
            $maxDistance: query.distance,
            $minDistance: 0,
          },
        };
      }

      const cursor = this.userProfileModel
        .find(searchQuery)
        .populate({
          path: 'user',
          select: {
            email: 1,
            mobile: 1,
            isActive: 1,
            isVerified: 1,
            isSuperAdmin: 1,
            isAdmin: 1,
          },
        })
        .limit(limit)
        .skip(skip)
        .sort(sortQuery);

      const result: IPaginateUserProfile = {
        data: await cursor.exec(),
      };

      if (query.pagination) {
        result.pagination = {
          total: await this.userProfileModel.countDocuments(searchQuery),
          limit,
          skip,
        };
      }
      return result;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Count All user profile
   * @returns {Promise<number>}
   */
  async count(query: SearchUserProfileDTO): Promise<number> {
    try {
      const searchQuery = createSearchQuery(query);

      if (
        query.hasOwnProperty('distance') &&
        query.hasOwnProperty('lat') &&
        query.hasOwnProperty('lng')
      ) {
        searchQuery['location.coordinates'] = {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [query.lat, query.lng],
            },
            $maxDistance: query.distance,
            $minDistance: 0,
          },
        };
      }

      return this.userProfileModel.countDocuments(searchQuery).exec();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}
