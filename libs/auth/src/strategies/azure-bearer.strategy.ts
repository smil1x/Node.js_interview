import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BearerStrategy } from 'passport-azure-ad';
import { AZURE_STRATEGY, AZURE_CONFIG } from '../constants';
import { IAzureConfig } from '../interfaces';

@Injectable()
export class AzureADStrategy extends PassportStrategy(BearerStrategy, AZURE_STRATEGY) {
  constructor(@Inject(AZURE_CONFIG) private azureConfig: IAzureConfig) {
    super({
      identityMetadata: `https://login.microsoftonline.com/${azureConfig.TENANT_ID}/${
        azureConfig.TOKEN_VERSION === 2 ? 'v2.0/' : ''
      }.well-known/openid-configuration`,
      clientID: azureConfig.CLIENT_ID,
      audience: azureConfig.AUDIENCE,
    });
  }

  async validate(data) {
    return data;
  }
}
