import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDTO implements Readonly<UpdateUserDTO> {
  @ApiProperty()
  isAdmin: boolean;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  isVerified: boolean;

  @ApiProperty({
    default: false,
  })
  isDeleted: boolean;

  @ApiProperty()
  timezone: string;
}
