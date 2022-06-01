## obj-factory-v1

### NFRs:

- CRUD methods to manage "object" entity
- GET endpoint supports Pagination
- Integrated with Config service ( AWS Secrets Manager )
- Swagger UI
- Compodoc
- Typescript + NestJS + PostgreSQL
- CORS
- QA: Unit and End-to-end tests
- DB: Migrations

### Routes:

```
/api/v1/objects, POST
/api/v1/objects, GET
/api/v1/objects/:objectId, GET
/api/v1/objects/:objectId, PATCH
/api/v1/objects/:objectId, PUT
/api/v1/objects/:objectId, DELETE
```

## obj-factory-v1-typeorm (based on "obj-factory-v1")

### NFRs: 

- communication with PostgreSQL relies on TypeORM

## obj-factory-v1-prisma (based on "obj-factory-v1" )

### NFRs: 

- communication with PostgreSQL relies on Prisma ORM

## obj-factory-v1-authn (based on "obj-factory-v1-typeorm")

### NFRs:
- provides  the passport-jwt strategy
- auth module is easy to reuse
- store passwords in the database as a hash
- use the most cryptographically strong algorithm for hashing passwords
- use only node.js utilities for hashing

### Routes:
```
/api/auth/signup, POST
```
accepts:
- email* - unique fields
- phone - unique fields
- password*
- username - unique fields 
- firstName
- lastName

<p>* — required fields</p>

returns:
- user entity without pwdHash

NFRs:
- firstName, lastName are stored in metadata
- all other data that came in is stored in the metadata
- username is automatically generated based on firstname and lastName (if username is not passed)
- createdAt, updatedAt fields in the database are filled with the current time
- createdBy, updatedBy fields in the database are filled with "system"

```
/api/auth/login, POST
```

accepts:
- email/phone/username*
- password*

<p>* — required fields</p>

returns:
- jwt token

NFRs:
- jwt token contains user entity without pwdHash

```
/api/auth/users/:userId, GET
```
accepts:
- userId - can be user's phone, email or username

returns:
- user entity without pwdHash

NFRs:
- only for authenticated users

```
/api/auth/users/:userId, PATCH
```

accepts:
- email - cannot be null
- phone
- username
- password - cannot be null
- firstName
- lastName

returns:
- updated user entity without pwdHash

NFRs:
- only for authenticated users
- all other data that came in is updated in the metadata fields if they exist, otherwise they are appended
- updatedBy field in the database is filled with the current user ID from jwt token using session variables
- updatedAt field in the database is filled with the current time

```
/api/auth/users, POST
```
The endpoint allows for already authenticated user create another user

accepts:
- email* - unique fields
- phone - unique fields
- password*
- username - unique fields
- firstName
- lastName

<p>* — required fields</p>

returns:
- user entity without pwdHash

NFRs:
- only for authenticated users
- all other data that came in is stored in the metadata
- username is automatically generated based on firstname and lastName (if username is not passed)
- createdAt, updatedAt fields in the database are filled with the current time
- createdBy, updatedBy fields in the database are filled with the current user ID jwt token using session variables

## obj-factory-v2-authn ( based on "obj-factory-v1-typeorm" )

### NFRs:
- provides Azure AD strategy with PassportStrategy and BearerStrategy

## obj-factory-v3-authn ( based on "obj-factory-v1-typeorm" )

### NFRs:
- provides Cognito strategy with passport-jwt strategy


## obj-factory-v1-authz (based on "obj-factory-v1-typeorm")

### NFRs:
- provides ABAC authorization
- TBD;

## obj-factory-v1-file-storage (based on "obj-factory-v1-typeorm")

### NFRs:
- integrates with AWS S3 storage
- TBD;

### Routes: 
```
/api/v1/objects, POST
```
accepts:
- supports both MIME types: "application/json", "multipart/form-data"
- file ( any format, xlsx, xls, csv, tsv, txt )
- objectId ( if provided then updates existing object, if not then creates a new one )

returns:
- object entity

notes: 
- stores the accepted file in S3 bucket
- files that are stored in S3 bucket are immutable but versioning is supported by AWS S3
- normalize / format column names to 'camelCase'
- copies the file content to the Object "content" property
- 

## obj-viewer-api  (based on "obj-factory-v1-file-storage")

### NFRs: 

```
/api/v1/tasks, POST
```
Endpoint works with full content that contains only _parameters_. External API accepts one content item.

```
/api/v1/objects/:objectId/content, GET ~ might need pagination
/api/v1/objects/:objectId/content, PATCH
/api/v1/objects/:objectId/content/:propertyId, DELETE

```
accepts:
- objectId uuid - the dataset to iterate through
- parameters sting[] - the dataset properties from content to be used in "serviceConfigTemplate"
- serviceConfigTemplate  \<AxiosRequestConfigTemplate\> 
- serviceName string - the external service name, will be used to create another property to where the result will be stored

returns: 
- depends on async / sync execution flow

next version:
- to support change feed / audit

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


## obj-factory-v1-multifile-storage (based on "obj-factory-v1-file-storage")

### NFRs:
- integrates with AWS S3 storage
- TBD

### Routes:
```
/api/v1/objects, POST
/api/v1/objects, GET
/api/v1/objects/:objectId, GET
/api/v1/objects/:objectId, PATCH
/api/v1/objects/:objectId, PUT
/api/v1/objects/:objectId, DELETE

/api/objects/{objectId}/files, POST
/api/objects/{objectId}/files, GET
/api/objects/{objectId}/files/{fileId}, GET
/api/objects/{objectId}/files/{fileId}, DELETE
```

accepts:
- supports "application/json" MIME type
- metadata - any JSON object

returns: ObjectEntity

POST /api/objects/{objectId}/files:

accepts:
- supports "application/json" and "multipart/form-data" MIME types
- files (any format)
- files upload strategy is defined by ContentType:
    1. proxying uploading to S3 through server
    2. returns Presigned URL to upload files
- saves initial files metadata: s3Key, fileName, fileExtension. If file.originalNames in request body are repeated, metadata for one name is stored in the database.

returns: files initial metadata

GET /api/objects/{objectId}/files

accepts:
- objectId, page, pageSize, presignedUrl: true/false (whether it is necessary to return presigned urls 'getObject' for files) parameters

returns:
- objectId, page, pageSize parameters, files metadata | files metadata with presigned url ('getObject') for each file


GET /api/objects/{objectId}/files/{fileName}

accepts:
- objectId, fileName (file.originalname)

returns:
-  objectId, file metadata with presignedURL ('getObject') for file


DELETE /api/objects/{objectId}/files/{fileName}

accepts:
- objectId, fileName (file.originalname)

returns:
- objectId, deleted file metadata

notes:
- stores the accepted files in S3 bucket
- files that are stored in S3 bucket are immutable but versioning is supported by AWS S3

## app-viewer

### NFRs:
- provides Azure authentication
- use pm2 to get launched applications

````
api/info, GET
````

returns: 
- list of launched applications



## Dashboard (for health library)

### FRs:
- display list of the launched applications
- display health parameters for each app

### NFRs:
- Angular SPA
- provides Azure authentication 

## obj-factory-ui-ng-v1
- Angular SPA

## obj-factory-ui-react-v1
- React SPA

# Libs

## health
 provides an endpoint that allows to get information about the application

```
/health, GET
```

### FRs:
provides:
- active RAM / all RAM
- os uptime
- timezone
- database connection
- app uptime  
- branch
- commit hash
- authorName
- commit time
- commit msg

## Ideas to explore
- cube.js ( https://cube.dev/ )

### Config
### OpenAPI

### Logger
 provides the ability to output logs to the Console and File.

### NFRs:
 - uses ["Winston"](https://github.com/winstonjs/winston) library under the hood.

### FRs:
provides:
- ability to output logs to the Console and File (log file is saved in the "build/logs" folder)
- logs level: 'error', 'warn', 'info', 'verbose', 'debug', 'silly' (from highest to lowest priority)


## Things to consider

- managing DB transactions
