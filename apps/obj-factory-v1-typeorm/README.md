## Description

### Obj-factory-v1-typeorm
Greenfield application with basic CRUD operations working with one atomic entity object, implemented with NestJS framework, connection to remote PostgreSQL DB via AWS RDS. 
Uses TypeORM for db communication.

### For installation and running app and tests use root README.md file
#### Local SWAGGER UI:

```bash
http://localhost:3000/api/docs/
```

### config.json file
To connect application to local PostgreSQL DB create config.json file in the root directory of obj-factory-v1-typeorm app with parameters:
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
    "APP_PORT": <app_port>
}
```
- APP_PORT - the port on which the application is running - optional, default 3000

#### To connect application to RDS use AWS credentials in config.json file as shown above.

Important: SYNCHRONIZE option indicates if database schema should be auto created on every application launch. This option is useful during debug and development. **Don't use this option in production**, because you can lose production data.

