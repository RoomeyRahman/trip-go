import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import 'dotenv/config';

const amqpUrl = process.env.RABBITMQ_TEST || 'amqp://localhost:5673';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [amqpUrl],
      queue: 'trip_go_queue',
      queueOptions: {
        durable: false,
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(6000);
  Logger.log(`TripGo Microservice is listening on port: 6000`, 'Bootstrap');
}
bootstrap();
