import { OmitType } from '@nestjs/swagger';
import { LoginDto } from './login.post';

export class GetUserDto extends OmitType(LoginDto, ['password'] as const) {}
