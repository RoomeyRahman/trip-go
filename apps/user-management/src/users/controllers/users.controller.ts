import { Controller, UseFilters, Logger, Post } from '@nestjs/common';
import { Payload, MessagePattern, RpcException } from '@nestjs/microservices';
import { CreateUserDTO } from '../dto';
import { IUser } from '../interfaces';
import { ExceptionFilter } from 'libs/shared/src/filters';
import { USER_MESSAGES } from 'libs/shared/src/constants/message.constant';
import { UsersService } from '../services';
import { Content } from 'libs/shared/src/decorators';

@Controller('users')
export class UsersController {
  /**
   * Constructor
   * @param {UsersService} usersService
   */
  constructor(private readonly usersService: UsersService) {}
  private readonly logger = new Logger(UsersController.name);

  /**
   * Create a user
   * @Body {UserDTO} userDTO
   * @returns {Promise<IUser>} created user data
   */
  @UseFilters(new ExceptionFilter())
  @MessagePattern(USER_MESSAGES.REGISTER)
  @Post()
  async register(
    @Content()
    userDTO: CreateUserDTO,
  ): Promise<IUser> {
    try {
      return await this.usersService.register(userDTO);
    } catch (err) {
      throw new RpcException(err);
    }
  }

  /**
   * verify a user by token
   * @Payload {string} token
   * @returns {Promise<IUser>} mutated user data
   */
  @UseFilters(new ExceptionFilter())
  @MessagePattern(USER_MESSAGES.AC_VERIFICATION_TOKEN)
  async accountVerification(
    @Payload()
    token: string,
  ): Promise<IUser> {
    try {
      return await this.usersService.accountVerification(token);
    } catch (err) {
      throw new RpcException(err);
    }
  }

  /**
   * Generate new token
   * @Param {string} email the user given email to fetch
   * @returns {Promise<object>} queried user data
   */
  @UseFilters(new ExceptionFilter())
  @MessagePattern(USER_MESSAGES.GENERATE_TOKEN)
  async generateToken(
    @Payload()
    payload,
  ): Promise<Record<string, unknown>> {
    try {
      return await this.usersService.generateToken(
        payload.email,
        payload.oldToken,
      );
    } catch (err) {
      throw new RpcException(err);
    }
  }
}
