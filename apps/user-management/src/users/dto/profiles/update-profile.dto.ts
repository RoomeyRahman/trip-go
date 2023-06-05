import {
  IsString,
  MaxLength,
  MinLength,
  Matches,
  IsMongoId,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { MediaDTO } from '../../../common/dto';
import { Media, Location } from '../../../common/schemas';
import { LocationDTO } from '../../../common/dto';

export class UpdateUserProfileDTO implements Readonly<UpdateUserProfileDTO> {
  @ApiProperty()
  @IsMongoId()
  user: string;

  @ApiProperty()
  @MaxLength(30)
  @MinLength(3)
  @Matches(/^[a-zA-Z ]+$/)
  @IsString()
  firstName: string;

  @ApiProperty()
  @MaxLength(30)
  @MinLength(3)
  @Matches(/^[a-zA-Z ]+$/)
  @IsString()
  lastName: string;

  @ApiProperty()
  @MaxLength(150)
  @MinLength(3)
  @IsString()
  headline: string;

  @ApiProperty()
  @MaxLength(5000)
  @IsString()
  summary: string;

  @ApiProperty()
  dob: number;

  @ApiProperty()
  gender: string;

  @ApiProperty({
    type: LocationDTO,
  })
  @Type(() => LocationDTO)
  location: Location;

  @ApiProperty({
    type: MediaDTO,
  })
  @Type(() => MediaDTO)
  profilePic: Media;

  @ApiProperty({
    type: MediaDTO,
  })
  @Type(() => MediaDTO)
  coverPic: Media;

  @ApiProperty({ default: false })
  isProfileCreated: boolean;

  @ApiProperty({ default: false })
  isDeleted: boolean;
}
