## Project Title

Obj-factory-ui-react-v1 ( based on "obj-factory-v1-typeorm")

## Description

Greenfield full-stack application that extends obj-factory-v1-typeorm app. Uses basic CRUD operations working with one atomic entity object.

## Tech Stack

**Client:** React, Material UI, Redux Toolkit

**Server:** NestJS, Postgres, Typeorm, AWS

**Common:** Typescript

## NFRs:

- communication with PostgreSQL relies on TypeORM;
- implements single-page application using React;
- provides style isolation with SCSS modules;
- static analysis and typing relies on Typesctipt;
- implements pagination;
- uses pages lazy loading;

### For installation and running app and tests use root README.md file

### Build Client:

```bash
cd apps/obj-factory-ui-react-v1/client

yarn build
```

#### Local SWAGGER UI:

```bash
http://localhost:3000/api/v1/
```

#### Local Client UI:

```bash
http://localhost:3000/
```

Develop mode for client:

```bash
cd apps/obj-factory-ui-react-v1/client

yarn start
```

### config.json file

To connect application to local PostgresQL DB create config.json file in root directory of obj-factory-v1-ui-react-v1 app with parameters:
```bash
{
    "PG_CONFIG": {
       "DATABASE_HOST": <db_host>,
       "DATABASE_PORT": <db_port>,
       "DATABASE_USERNAME": <db_username>,
       "DATABASE_PASSWORD": <db_password>,
       "DATABASE_NAME": <db_name>,
       "DATABASE_SYNCHRONIZE": <db_synchronize> (true/false)
    }
}
```

## Environment Variables

To resolve dependency tree problem with "babel-jest" package add environment variable to your .env file in client folder:

`SKIP_PREFLIGHT_CHECK=true`

### To connect application to RDS use AWS credentials in config.json file as shown above.

Important: SYNCHRONIZE option indicates if database schema should be auto created on every application launch. This option is useful during debug and development. **Don't use this option in production**, because you can lose production data.
