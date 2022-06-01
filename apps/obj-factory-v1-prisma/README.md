## Description

### Obj-factory-v1-prisma
Greenfield application with basic CRUD operations working with one atomic entity object, implemented with NestJS framework, connection to remote PostgreSQL DB via AWS RDS. Uses Prisma ORM for db communication.

### For installation and running app use root README.md file
#### Local SWAGGER UI:

```bash
http://localhost:3000/api/docs/
```

### .env file
To connect application to local PostgreSQL DB create .env file in the root directory of obj-factory-v1-prisma app with parameters:
```
DATABASE_URL=postgresql://<db_username>:<db_password><db_host>:<db_port>/<db_name>
APP_PORT: <app_port>
```
- APP_PORT - the port on which the application is running - optional, default 3000

#### To connect application to RDS use AWS credentials in env file as shown above.

After setting DATABASE_URL generate Prisma Client with the following command (run this command from root - obj-factory-v1-prisma directory):
```bash
$ prisma generate
```