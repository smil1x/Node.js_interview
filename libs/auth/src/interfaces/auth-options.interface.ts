import { IJwtConfig, IAzureConfig, ICognitoConfig } from './';
import { RequireAtLeastOne } from '@app/common/types';

interface IAuthConfig {
  jwt_strategy: IJwtConfig;
  azure_strategy: IAzureConfig;
  cognito_strategy: ICognitoConfig;
}

export type AuthOptions = RequireAtLeastOne<IAuthConfig, 'jwt_strategy' | 'azure_strategy' | 'cognito_strategy'>;
