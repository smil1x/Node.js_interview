import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { JWT_STRATEGY, JWT_CONFIG } from '../constants';
import { IJwtConfig } from '../interfaces';

@Injectable()
export class JwtPassportStrategy extends PassportStrategy(Strategy, JWT_STRATEGY) {
  constructor(@Inject(JWT_CONFIG) private jwtConfig: IJwtConfig) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secretKey,
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
