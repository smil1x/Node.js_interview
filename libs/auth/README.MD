## Description

Auth library uses passport.js and  provides several authentication strategies:
- jwt-strategy
- azure-bearer-strategy
- cognito-strategy

###Import

Imports AuthModule into the root module(AppModule)
```typescript
    import { AuthModule } from '@app/auth';
    
    @Module({})
    export class AppModule {
      public static register(options: AppRegisterOptions): DynamicModule {
        const { config } = options;
    
        return {
          module: AppModule,
          imports: [AuthModule.register(config.authOptions)],
        };
      }
    }
```

**Important**: for usage jwt-strategy insert UserEntity into entity array
```typescript
    import { AuthModule, UserEntity } from '@app/auth';
    
    @Module({})
    export class AppModule {
      public static register(options: AppRegisterOptions): DynamicModule {
        const { config } = options;
    
        return {
          module: AppModule,
          imports: [
            AuthModule.register(config.authOptions), 
            TypeOrmModule.forRoot({
              type: 'postgres',
              host: config.PG_CONFIG.DATABASE_HOST,
              port: config.PG_CONFIG.DATABASE_PORT,
              username: config.PG_CONFIG.DATABASE_USERNAME,
              password: config.PG_CONFIG.DATABASE_PASSWORD,
              database: config.PG_CONFIG.DATABASE_NAME,
              entities: [UserEntity],
              synchronize: config.PG_CONFIG.DATABASE_SYNCHRONIZE,
            })
          ],
        };
      }
    }
```
At least one strategy must be passed to AuthModule

###Guard
To protect the controllers, pass the strategies to AuthGuard
```typescript
import { AZURE_STRATEGY, JWT_STRATEGY, COGNITO_STRATEGY } from '@app/auth/constants';

@UseGuards(AuthGuard([AZURE_STRATEGY, JWT_STRATEGY, COGNITO_STRATEGY]))
export class Controller {
  constructor() {
  }

  @Get()
  async hello() {
    return 'hello'
  }
}
```