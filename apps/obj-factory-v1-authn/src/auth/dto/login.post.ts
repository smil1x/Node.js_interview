import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsUserIdentity } from '../decorators';
import { INCORRECT_IDENTITY } from '../error-messages';
import { Transform } from 'class-transformer';
import { phoneRegExp } from '../constants';

export class LoginDto {
  @Transform(({ value }) => (phoneRegExp.test(value) ? value.replace(/\D/g, '') : value))
  @ApiProperty({ description: 'phone/email/username' })
  @IsNotEmpty()
  @IsString()
  @IsUserIdentity({ message: INCORRECT_IDENTITY })
  identity: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
