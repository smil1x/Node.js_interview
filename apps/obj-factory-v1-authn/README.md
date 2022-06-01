## Description

### Obj-factory-v1-authn
The application based on "obj-factory-v1-typeorm" demonstrating the passport-jwt strategy and providing the following routes to work with authentication:
```
/api/auth/signup, POST
/api/auth/login, POST
/api/auth/users/:userId, GET
/api/auth/users/:userId, PATCH
/api/auth/users, POST
```
More detailed specification is in SPECS.MD in root

**Important**: if you want to store/update data exceeding SignUpDto/UpdateUserDto in metadata, then configure globalValidationPipe:
 - whitelist: false, 
 - forbidNonWhitelisted: false,

### For installation and running app and tests use root README.md file
#### Local SWAGGER UI:

```bash
http://localhost:3000/api/docs/
```

### config.json file

To connect application to local PostgreSQL DB and AWS S3 bucket create config.json file in the root directory of obj-factory-v1-authn app with parameters:
```
{
    "PG_CONFIG": {
       "DATABASE_HOST": <db_host>,
       "DATABASE_PORT": <db_port>,
       "DATABASE_USERNAME": <db_username>,
       "DATABASE_PASSWORD": <db_password>,
       "DATABASE_NAME": <db_name>,
       "DATABASE_SYNCHRONIZE": <db_synchronize> (true/false)
    },
    "JWT_SECRET": <key>,
    "APP_PORT": <app_port>
}
```
- JWT_SECRET - key for token signature
- APP_PORT - the port on which the application is running - optional, default 3000

Important: SYNCHRONIZE option indicates if database schema should be auto created on every application launch. This option is useful during debug and development. **Don't use this option in production**, because you can lose production data.

#### To connect application to RDS use AWS credentials in config.json file as shown above.
