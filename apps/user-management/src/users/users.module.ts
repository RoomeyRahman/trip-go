import { Module } from '@nestjs/common';
import { UsersController } from './controllers';
import { UsersService, UserProfileService } from './services';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, USER, UserProfileSchema, USER_PROFILE } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: USER, schema: UserSchema },
      { name: USER_PROFILE, schema: UserProfileSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserProfileService],
})
export class UsersModule {}
