import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { APP_DESCRIPTION } from './core/constants';
import { ConfigService } from '@app/config';
import { configOptions } from './config-options.provider';
import { BaseConfigInterface } from './core/interfaces';
import { defaultValidationPipe } from './core/pipes';

async function bootstrap() {
  const configService = new ConfigService(configOptions);
  const config = await configService.getConfig<BaseConfigInterface>();
  const app = await NestFactory.create(AppModule.register({ config }));
  app.useGlobalPipes(defaultValidationPipe);

  app.enableCors();
  app.setGlobalPrefix('api');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Obj-factory-v3-authn')
    .setDescription(APP_DESCRIPTION.info)
    .setVersion('0.1.0')
    .addBearerAuth({
      type: 'oauth2',
      flows: {
        authorizationCode: {
          authorizationUrl: `${config.COGNITO_CONFIG.DOMAIN}/oauth2/authorize`,
          tokenUrl: `${config.COGNITO_CONFIG.DOMAIN}/oauth2/token`,
          refreshUrl: `${config.COGNITO_CONFIG.DOMAIN}/oauth2/token`,
          scopes: {},
        },
      },
    })
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  const appUrl = config.APP_PROTOCOL + '://' + config.APP_HOSTNAME;
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: { oauth2RedirectUrl: appUrl + '/api/docs/oauth2-redirect.html' },
  });

  await app.listen(config.APP_PORT || 3000);
}
bootstrap();
