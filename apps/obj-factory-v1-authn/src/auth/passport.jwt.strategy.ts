import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { SECRET_KEY } from './constants';

@Injectable()
export class JwtPassportStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(SECRET_KEY) private jwtOptions) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtOptions.secretKey,
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
