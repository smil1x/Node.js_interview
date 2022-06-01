### Description
Logger library provides the ability to output logs to the console and file.
Uses "winston" lib under the hood.

### Logger config
- To output logs you can set 'appName' (required parameter), 'appVersion' - CommonOptions in AppModule file and specify LOGGER_CONFIG: 'TRANSPORT_TYPE' and 'LOG_LEVEL' properties in config.json file (Don't forget to update config-schema.ts of your App).
- If you don't provide the config options ('TRANSPORT_TYPE' and 'LOG_LEVEL') for Logger Module, then by default all logs will be output to the Console with logLevel - 'info'.

**Default transport type: 'Console'.**
**Default log level: 'info'.**
```
config.json file
 {
    ....
    
    "LOGGER_CONFIG": {
        "TRANSPORT_TYPE": <transportType> ('Console' | 'File'),
        "LOG_LEVEL": <logLevel> ('info', 'error', 'warn', 'debug', 'verbose', 'silly')
    }
  }
```

### Logging levels
Winston logging levels are prioritized from 0 to 6 (highest to lowest):
```
{
    error: 0,
    warn: 1,
    info: 2,
    verbose: 4,
    debug: 5,
    silly: 6
}
```

_So if you pass 'error' log level to logger config, only this type will be output to the console or file.
If you pass 'warn' log level, 'error' and 'warn' logs will be output to the console or file, etc._

###Import

Import LoggerModule into the root module (AppModule).

_An example of connecting the logger library can also be viewed in the obj-factory-v1-typeorm app._

```typescript
import { LoggerModule, prepareLoggerConfig, logLevels } from '@app/logger';
import { CommonOptionsInterface } from '@app/common/interfaces';
import { name, version } from '../package.json';

const commonOptions: CommonOptionsInterface = {
  appName: name,
  appVersion: version,
};

@Module({})
export class AppModule {
  public static register(options: AppRegisterOptions): DynamicModule {
    const { config } = options;

    return {
      module: AppModule,
      imports: [
        /*
        * LOGGER_CONFIG - optional
        */
        LoggerModule.register(prepareLoggerConfig(config.LOGGER_CONFIG, commonOptions)),
        /*
        *  OR (default values will be used for logger)
        */
        LoggerModule.register({
          ...commonOptions,
        }),
      ]
    };
  }
}
```

You can restrict the default NestJS logger behavior by specifying only a certain logging level (main.js file).
```typescript
import { CustomLogService } from '@app/logger';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule, { logger: ['error'] });

  await app.listen(3000);
  
  app.useLogger(app.get(CustomLogService));
}
bootstrap();

```

### Usage
```typescript
export class SomeService {
  constructor(
    /*
       Inject CustomLogService
     */
    private logger: CustomLogService,
  ) {}
  
  someMethod() {
    /* 
      Pass message and optional parameters to the method of LoggerService
     */
    this.logger.log('Hello world', { a: 1 }, true, false, []);
    this.logger.warn('Warning');
    this.logger.error(e.message, e.stack);
  }
}
```