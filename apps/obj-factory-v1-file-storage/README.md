## Description

### Obj-factory-v1-file-storage (based on "obj-factory-v1-typeorm")
Application that allows you to create objects with attached file xlsx | xls | csv | tsv | txt format, that uploads to storage (content of a file is saved
to a database), implemented with NestJS framework, connection to remote PostgreSQL DB via AWS RDS and connection to AWS Simple Storage Service (S3) for storing your files. Uses TypeORM for db communication.

#### Details:
Route for uploading file and saving its content in database: /api/v1/objects, POST
- supports xlsx, xls, csv, tsv, txt file formats
- copies the file content to the created object "content" property
- you can provide "objectId" to update existing object and save new file version in storage

### For installation and running app use root README.md file
#### Local SWAGGER UI:
```bash
http://localhost:3000/api/docs/
```

### config.json file
To connect application to local PostgreSQL DB and AWS S3 bucket create config.json file in the root directory of obj-factory-v1-file-storage app with parameters:
```
{
    "AWS_BUCKET_NAME":  <bucket_name>,
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

