import { DynamicModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { createAuthControllers, createAuthImports, createAuthProviders } from './auth.provider';
import { AuthOptions } from '@app/auth/interfaces';

@Module({})
export class AuthModule {
  static register(options: AuthOptions): DynamicModule {
    const imports = [PassportModule];
    const controllers = [];
    const providers = [];

    return {
      module: AuthModule,
      imports: [...imports, ...createAuthImports(options)],
      controllers: [...controllers, ...createAuthControllers(options)],
      providers: [...providers, ...createAuthProviders(options)],
    };
  }
}
