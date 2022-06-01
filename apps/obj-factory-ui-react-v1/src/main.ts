import { NestFactory } from '@nestjs/core';
import { AppModule } from './core/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { APP_DESCRIPTION } from './core/constants';
import { ConfigService } from '@app/config';
import { configOptions } from './config-options.provider';
import { BaseConfigInterface } from './core/interfaces';
import { defaultValidationPipe } from './core/pipes/default-validation.pipe';

async function bootstrap() {
  const configService = new ConfigService(configOptions);
  const config = await configService.getConfig<BaseConfigInterface>();
  const app = await NestFactory.create(AppModule.register({ config }));
  app.useGlobalPipes(defaultValidationPipe);

  app.enableCors();
  app.setGlobalPrefix('api/');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Obj-factory-v1-typeorm')
    .setDescription(APP_DESCRIPTION)
    .setVersion('0.1.0')
    .addTag('Objects')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/v1', app, document);

  await app.listen(3000);
}
bootstrap();
