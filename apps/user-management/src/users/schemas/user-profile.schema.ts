import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { USER, User } from './user.schema';
import {
  LocationDocument,
  LocationSchema,
  MediaDocument,
  MediaSchema,
} from '../../common/schemas';

export type UserProfileDocument = UserProfile & Document;
export const USER_PROFILE = 'user-profiles';

@Schema()
export class UserProfile {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: USER,
    unique: true,
    required: true,
    immutable: true,
  })
  user: User;

  @Prop({
    minlength: 3,
    maxlength: 30,
  })
  firstName: string;

  @Prop({
    minlength: 3,
    maxlength: 30,
  })
  lastName: string;

  @Prop()
  dob: number;

  @Prop({
    type: LocationSchema,
  })
  location: LocationDocument;

  @Prop({
    minlength: 3,
    maxlength: 150,
  })
  headline: string;

  @Prop({
    minlength: 0,
    maxlength: 5000,
  })
  summary: string;

  @Prop()
  gender: string;

  @Prop({
    type: MediaSchema,
  })
  profilePic: MediaDocument;

  @Prop({
    type: MediaSchema,
  })
  coverPic: MediaDocument;

  @Prop({ default: false })
  isProfileCreated: boolean;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ default: Date.now() })
  cTime: number;

  @Prop()
  cBy: string;

  @Prop({ default: Date.now() })
  uTime: number;

  @Prop()
  uBy: string;
}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);

UserProfileSchema.set('toJSON', {
  transform: function (doc, ret) {
    return {
      _id: ret._id,
      firstName: ret.firstName,
      lastName: ret.lastName,
      dob: ret.dob,
      location: ret.location,
      headline: ret.headline,
      summary: ret.summary,
      gender: ret.gender,
      profilePic: ret.profilePic,
      coverPic: ret.coverPic,
      isProfileCreated: ret.isProfileCreated,
    };
  },
});
