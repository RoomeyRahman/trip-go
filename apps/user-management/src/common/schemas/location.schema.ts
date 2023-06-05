import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LocationDocument = Location & Document;

@Schema()
export class Location {
  @Prop()
  address: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  country: string;

  @Prop()
  zipCode: string;

  @Prop()
  lat: number;

  @Prop()
  lng: number;

  @Prop({
    enum: ['Point'],
    required: true,
    default: 'Point',
  })
  type: string;

  @Prop({
    required: false,
    index: '2dsphere',
  })
  coordinates: number[];

  @Prop({ default: false })
  isDeleted: boolean;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
