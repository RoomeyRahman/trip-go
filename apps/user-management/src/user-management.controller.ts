import { Controller, Get } from '@nestjs/common';
import { UserManagementService } from './user-management.service';
import { Payload, MessagePattern } from '@nestjs/microservices';
import { USER_MESSAGES } from 'libs/shared/src/constants/message.constant';

@Controller()
export class UserManagementController {
  constructor(private readonly userManagementService: UserManagementService) {}

  @Get()
  @MessagePattern(USER_MESSAGES.GET_USER_BY_ID)
  getHello(
    @Payload()
    userId: string,
  ): string {
    console.log(userId);
    return this.userManagementService.getHello();
  }
}
