import { Inject, Controller, Body, Post } from '@nestjs/common';
import { SERVICE_MESSAGES, USER_MESSAGES } from '@app/shared/constants';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateUserDTO } from 'apps/user-management/src/users/dto';
import { IUser } from 'apps/user-management/src/users/interfaces';

@Controller('users')
export class UserManagementController {
  constructor(
    @Inject(SERVICE_MESSAGES.USER_MANAGEMENT) private client: ClientProxy,
  ) {}

  @Post()
  register(
    @Body()
    userDTO: CreateUserDTO,
  ): Observable<IUser> {
    try {
      return this.client.send<IUser>(USER_MESSAGES.REGISTER, userDTO);
    } catch (err) {
      console.log(err);
    }
  }
}
