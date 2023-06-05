import { IUser } from './user.interface';
import { ILocation, IMedia } from '../../common/interfaces';

export interface IUserProfile {
  readonly user: IUser | string;
  readonly firstName: string;
  readonly lastName: string;
  readonly headline: string;
  readonly summary: string;
  readonly dob: number;
  readonly gender: string;
  readonly location: ILocation;
  readonly profilePic: IMedia;
  readonly coverPic: IMedia;
  readonly isProfileCreated: boolean;
  readonly cTime: number;
  readonly cBy: string;
  readonly uTime: number;
  readonly uBy: string;
  readonly dTime: number;
  readonly dBy: string;
}
