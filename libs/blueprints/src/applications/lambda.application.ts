import { ApplicationInterface, InitParams } from '@app/blueprints/interfaces';
import { restructureConfig } from '@app/common';
import { ConfigOptionsInterface } from '@app/config/interfaces/config-options.interface';
import { ApplicationType } from '@app/config/enums/application-type.enum';
import { ConfigService } from '@app/config';
import { NestFactory } from '@nestjs/core';
import { INestApplicationContext } from '@nestjs/common';

export class Lambda implements ApplicationInterface {
  async init<T>(params: InitParams<T>): Promise<INestApplicationContext> {
    const { appName, configSchema, rootModule } = params;
    const config: T = await Lambda.getAppConfig(appName, configSchema);
    return NestFactory.createApplicationContext(rootModule.register({ config }), {
      logger: ['error'],
    });
  }

  private static async getAppConfig<T>(appName: string, schema: any) {
    const providedConfig = restructureConfig({ ...process.env });

    const configOptions: ConfigOptionsInterface = {
      appName,
      providedConfig,
      providedSchema: schema,
      applicationType: ApplicationType.LAMBDA,
    };

    const configService = new ConfigService(configOptions);
    return configService.getConfig<T>();
  }
}
