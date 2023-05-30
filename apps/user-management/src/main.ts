import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { UserManagementModule } from './user-management.module';
import { QUEUES } from '@app/shared/constants';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(UserManagementModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_TEST],
      queue: QUEUES.USERS_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(3000);
  Logger.log(`User Microservice is listening on: 3000`, 'Bootstrap');
}
bootstrap();
