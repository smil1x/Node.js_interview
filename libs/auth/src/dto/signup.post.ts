import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { emailRegExp, passwordRegExp, phoneRegExp, usernameRegExp } from '../constants';
import { INCORRECT_EMAIL, INCORRECT_PASSWORD, INCORRECT_PHONE, userNameConstrains } from '../error-messages';
import { Transform, Type } from 'class-transformer';

export class SignupDto {
  @Type(() => String)
  @Transform(({ value }) => (phoneRegExp.test(value) ? value.replace(/\D/g, '') : value))
  @IsOptional()
  @Matches(phoneRegExp, { message: INCORRECT_PHONE })
  @ApiPropertyOptional({ description: "user's phone", example: '88005553535' })
  phone: string;

  @IsNotEmpty()
  @Matches(emailRegExp, { message: INCORRECT_EMAIL })
  @ApiProperty({ description: "user's email", example: 'user@gmail.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(passwordRegExp, { message: INCORRECT_PASSWORD })
  @ApiProperty({ description: "user's password", example: 'qwerty' })
  password: string;

  @IsOptional()
  @IsString()
  @Matches(usernameRegExp(), { message: `username: ${userNameConstrains()}` })
  @ApiPropertyOptional()
  username: string;

  @IsOptional()
  @IsString()
  @Matches(usernameRegExp(2, 13), { message: `first name: ${userNameConstrains(2, 13)}` })
  @ApiPropertyOptional({ description: "user's first name", example: 'Ivan' })
  firstName: string;

  @IsString()
  @IsOptional()
  @Matches(usernameRegExp(2, 13), { message: `last name: ${userNameConstrains(2, 13)}` })
  @ApiPropertyOptional({ description: "user's last name", example: 'Ivanov' })
  lastName: string;
}
