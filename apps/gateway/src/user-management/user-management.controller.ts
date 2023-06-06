import {
  Inject,
  Controller,
  Body,
  Post,
  HttpStatus,
  HttpException,
  UsePipes,
} from '@nestjs/common';
import { SERVICE_MESSAGES, USER_MESSAGES } from '@app/shared/constants';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateUserDTO } from 'apps/user-management/src/users/dto';
import { IUser } from 'apps/user-management/src/users/interfaces';
import { NullValidationPipe, ValidationPipe, TrimPipe } from '../common/pipes';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiTags,
  ApiHeader,
  ApiExcludeEndpoint,
} from '@nestjs/swagger';

/**
 * User Controller
 */
@ApiTags('User')
@ApiResponse({
  status: HttpStatus.METHOD_NOT_ALLOWED,
  description: 'Method not allowed',
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Server Error!',
})
@Controller('users')
export class UserManagementController {
  constructor(
    @Inject(SERVICE_MESSAGES.USER_MANAGEMENT) private client: ClientProxy,
  ) {}

  /**
   * Create a user
   * @Body {CreateUserDTO} createUserDTO
   * @returns {Promise<IUser>} created user data
   */
  @ApiOperation({ summary: 'User registration: create new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return new user.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @ApiResponse({
    status: HttpStatus.NOT_ACCEPTABLE,
    description: 'Record already exist',
  })
  @UsePipes(new NullValidationPipe())
  @UsePipes(new ValidationPipe(true))
  @UsePipes(new TrimPipe())
  @Post()
  register(
    @Body()
    createUserDTO: CreateUserDTO,
  ): Observable<IUser> {
    try {
      return this.client.send<IUser>(USER_MESSAGES.REGISTER, createUserDTO);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}
