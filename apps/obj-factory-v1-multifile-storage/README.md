## Description

### Obj-factory-v1-multifile-storage (based on "obj-factory-v1-file-storage")
Application that allows you to upload files with any format to storage and save files metadata 
to a database, implemented with NestJS framework, connection to remote PostgreSQL DB via AWS RDS and connection to AWS Simple Storage Service (S3) for storing your files. Uses TypeORM for db communication.

#### Details:
Application is connected with authentication lib and providing the following routes to work with authentication:
```
/api/auth/signup, POST
/api/auth/login, POST
```

Route for creating objects: ```/api/objects, POST```
accepts:
- supports "application/json" MIME type
- metadata - any JSON object

returns: ObjectEntity

Route for uploading files and saving its metadata in database: ```/api/objects/{objectId}/files, POST```

accepts:
- supports "application/json" ans "multipart/form-data" MIME types
- files (any format)
- files upload strategy is defined by ContentType:
    1. proxying uploading to S3 through server
    2. returns Presigned URL to upload files
- saves initial files metadata: S3 key, S3 bucket name, filename, file extension. If file.originalNames in request body are repeated, duplicate is not stored in the database.

### For installation and running app use root README.md file
#### Local SWAGGER UI:
```bash
http://localhost:3000/api/docs/
```

### config.json file
To connect application to local PostgreSQL DB and AWS S3 bucket create config.json file in the root directory of obj-factory-v1-multifile-storage app with parameters:
```
{
    "AWS_BUCKET_NAME": <bucket_name>,
    "PG_CONFIG": {
       "DATABASE_HOST": <db_host>,
       "DATABASE_PORT": <db_port>,
       "DATABASE_USERNAME": <db_username>,
       "DATABASE_PASSWORD": <db_password>,
       "DATABASE_NAME": <db_name>,
       "DATABASE_SYNCHRONIZE": <db_synchronize> (true/false)
    },
    "MAX_TOTAL_FILES_SIZE": <max_size_in_bytes>,
    "AWS_S3_SIGNATURE_VERSION": <signature_version>,
    "SIGNED_URL_EXPIRES_AT": <signed_url_expiration_period_in_seconds>,
    "JWT_SECRET": <key>,
    "APP_PORT": <app_port>
}
```
- JWT_SECRET - key for token signature
- APP_PORT - the port on which the application is running - optional, default 3000

#### To connect application to RDS use AWS credentials in config.json file as shown above.

Important: SYNCHRONIZE option indicates if database schema should be auto created on every application launch. This option is useful during debug and development. **Don't use this option in production**, because you can lose production data.

