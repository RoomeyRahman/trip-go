import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserManagementController } from './user-management.controller';
import { QUEUES, SERVICE_MESSAGES } from '@app/shared/constants';
import 'dotenv/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: SERVICE_MESSAGES.USER_MANAGEMENT,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_TEST],
          queue: QUEUES.USERS_QUEUE,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [UserManagementController],
})
export class UserManagementModule {}
