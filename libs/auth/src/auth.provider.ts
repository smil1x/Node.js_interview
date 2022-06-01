import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/auth/user.entity';
import { AuthController } from '@app/auth/auth.controller';
import { AuthService } from '@app/auth/auth.service';
import { AzureADStrategy, JwtPassportStrategy, CognitoStrategy } from '@app/auth/strategies';
import { AZURE_CONFIG, COGNITO_CONFIG, JWT_CONFIG } from '@app/auth/constants';
import { AuthOptions, IAzureConfig, ICognitoConfig, IJwtConfig } from '@app/auth/interfaces';

const importsMap = {
  jwt_strategy: (jwtConfig: IJwtConfig) => [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: jwtConfig.secretKey,
      signOptions: { expiresIn: '1d' },
    }),
  ],
};

const controllersMap = {
  jwt_strategy: [AuthController],
};

const providersMap = {
  jwt_strategy: (jwtConfig: IJwtConfig) => [
    AuthService,
    JwtPassportStrategy,
    {
      provide: JWT_CONFIG,
      useValue: jwtConfig,
    },
  ],
  azure_strategy: (azureConfig: IAzureConfig) => [
    AzureADStrategy,
    {
      provide: AZURE_CONFIG,
      useValue: azureConfig,
    },
  ],
  cognito_strategy: (cognitoConfig: ICognitoConfig) => [
    CognitoStrategy,
    {
      provide: COGNITO_CONFIG,
      useValue: cognitoConfig,
    },
  ],
};

export function createAuthImports(authOptions: AuthOptions) {
  return Object.keys(authOptions).reduce(
    (imports, configName) =>
      importsMap[configName] ? [...imports, ...importsMap[configName](authOptions[configName])] : imports,
    [],
  );
}

export function createAuthControllers(authOptions: AuthOptions) {
  return Object.keys(authOptions).reduce(
    (controllers, configName) =>
      controllersMap[configName] ? [...controllers, ...controllersMap[configName]] : controllers,
    [],
  );
}

export function createAuthProviders(authOptions: AuthOptions) {
  return Object.keys(authOptions).reduce(
    (providers, configName) =>
      providersMap[configName] ? [...providers, ...providersMap[configName](authOptions[configName])] : providers,
    [],
  );
}
