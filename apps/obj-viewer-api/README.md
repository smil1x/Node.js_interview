## Description

### Obj-viewer-api ( based on "obj-factory-v1-file-storage")
Proxy application that allows to change object content ("content" column contains all content of the file uploaded to the S3 bucket), implemented with NestJS framework, connection to remote PostgreSQL DB 
via AWS RDS and connection to AWS Simple Storage Service (S3) for storing your files. Uses TypeORM for db communication.

### For installation and running app and tests use root README.md file
#### Local SWAGGER UI:

```bash
http://localhost:3000/api/docs/
```

### config.json file
To connect application to local PostgreSQL DB and AWS S3 bucket create config.json file in the root directory of obj-viewer-api app with parameters:
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
    }
    "APP_PORT": <app_port>
}
```
- APP_PORT - the port on which the application is running - optional, default 3000

#### To connect application to RDS use AWS credentials in config.json file as shown above.

Important: SYNCHRONIZE option indicates if database schema should be auto created on every application launch. This option is useful during debug and development. **Don't use this option in production**, because you can lose production data.

### Update content:

```
/api/v1/objects/:objectId/content, PATCH
```
accepts:
 - contentId:number - id of content row;
 - fields: object []:

   1. key:string - name of the field that will be updated;
   2. value:string - new field value;

returns:
- updatedFields: object []:

   1. key:string - updated field;
   2. value:string - new field value;


### Create tasks:

```
/api/v1/tasks, POST
```
Endpoint works with full content that contains only parameters. External API accepts one content item.

accepts:
 - objectId uuid - the dataset to iterate through
 - parameters sting[] - the dataset properties from content to be used in "serviceConfigTemplate"
 - serviceConfigTemplate  \<AxiosRequestConfigTemplate>
 - serviceName string - the external service name, will be used to create another property to where the result will be stored

returns: 
 - CreateTasksResponse: object:

  1. success:  object [] - successfully completed tasks
  2. failed: object [] - failed tasks