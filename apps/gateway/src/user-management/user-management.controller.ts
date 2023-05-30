import { Inject, Controller, Param, Get } from '@nestjs/common';
import { SERVICE_MESSAGES, USER_MESSAGES } from '@app/shared/constants';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('users')
export class UserManagementController {
  constructor(
    @Inject(SERVICE_MESSAGES.USER_MANAGEMENT) private client: ClientProxy,
  ) {}

  @Get(':userId')
  getHello(@Param('userId') userId: string): Observable<string> {
    try {
      const pattern = USER_MESSAGES.GET_USER_BY_ID;
      return this.client.send<string>(pattern, userId);
    } catch (err) {
      console.log(err);
    }
  }
}
