import { DynamicModule, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtPassportStrategy } from './passport.jwt.strategy';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SECRET_KEY } from './constants';
import { UserEntity } from './user.entity';

@Module({})
export class AuthModule {
  static register({ secretKey }: { secretKey: string }): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        TypeOrmModule.forFeature([UserEntity]),
        PassportModule,
        JwtModule.register({
          secret: secretKey,
          signOptions: { expiresIn: '1d' },
        }),
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: SECRET_KEY,
          useValue: { secretKey },
        },
        JwtPassportStrategy,
      ],
    };
  }
}
