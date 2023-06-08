import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserManagementController } from './user-management.controller';
import { QUEUES, SERVICE_MESSAGES } from '@app/shared/constants';
import 'dotenv/config';

const amqpUrl = process.env.RABBITMQ_TEST || 'amqp://localhost:5673';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: SERVICE_MESSAGES.USER_MANAGEMENT,
        transport: Transport.RMQ,
        options: {
          urls: [amqpUrl],
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
