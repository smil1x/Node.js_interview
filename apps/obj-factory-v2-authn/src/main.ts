import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { APP_DESCRIPTION } from './core/constants';
import { ConfigService } from '@app/config';
import { configOptions } from './config-options.provider';
import { BaseConfigInterface } from './core/interfaces';
import { defaultValidationPipe } from './core/pipes';
import { AZURE_STRATEGY, JWT_STRATEGY } from '@app/auth/constants';

async function bootstrap() {
  const configService = new ConfigService(configOptions);
  const config = await configService.getConfig<BaseConfigInterface>();
  const app = await NestFactory.create(AppModule.register({ config }));
  app.useGlobalPipes(defaultValidationPipe);

  app.enableCors();
  app.setGlobalPrefix('api');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Obj-factory-v2-authn')
    .setDescription(APP_DESCRIPTION.info)
    .setVersion('0.1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, JWT_STRATEGY)
    .addBearerAuth(
      {
        type: 'oauth2',
        flows: {
          implicit: {
            authorizationUrl: `https://login.microsoft.com/${config.AUTH_OPTIONS.azure_strategy.TENANT_ID}/oauth2/v2.0/authorize`,
            scopes: config.AUTH_OPTIONS.azure_strategy.SCOPES,
          },
        },
      },
      AZURE_STRATEGY,
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  const appUrl = config.APP_PROTOCOL + '://' + config.APP_HOSTNAME;

  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: { oauth2RedirectUrl: appUrl + '/api/docs/oauth2-redirect.html' },
  });
  await app.listen(config.APP_PORT || 3000);
}
bootstrap();
