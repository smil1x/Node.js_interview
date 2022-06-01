import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { passportJwtSecret } from 'jwks-rsa';
import { COGNITO_CONFIG, COGNITO_STRATEGY } from '@app/auth/constants';
import { ICognitoConfig } from '@app/auth/interfaces';

@Injectable()
export class CognitoStrategy extends PassportStrategy(Strategy, COGNITO_STRATEGY) {
  constructor(@Inject(COGNITO_CONFIG) private cognitoConfig: ICognitoConfig) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://cognito-idp.${cognitoConfig.COGNITO_REGION}.amazonaws.com/${cognitoConfig.POOL_ID}/.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      issuer: `https://cognito-idp.${cognitoConfig.COGNITO_REGION}.amazonaws.com/${cognitoConfig.POOL_ID}`,
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
