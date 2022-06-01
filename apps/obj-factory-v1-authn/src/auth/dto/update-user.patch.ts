import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { SignupDto } from './signup.post';
import { IsString, Matches, ValidateIf } from 'class-validator';
import { emailRegExp, passwordRegExp } from '../constants';
import { INCORRECT_EMAIL, INCORRECT_PASSWORD } from '../error-messages';

// so as not to overwrite email and password in bd with a null value
export class UpdateUserDto extends OmitType(PartialType(SignupDto), ['email', 'password'] as const) {
  @ValidateIf(({ email }) => email !== undefined)
  @Matches(emailRegExp, { message: INCORRECT_EMAIL })
  @ApiPropertyOptional()
  email: string;

  @ValidateIf(({ password }) => password !== undefined)
  @IsString()
  @Matches(passwordRegExp, { message: INCORRECT_PASSWORD })
  @ApiPropertyOptional()
  password: string;
}
