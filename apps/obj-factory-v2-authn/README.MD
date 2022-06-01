## Description

### Obj-factory-v2-authn
The application based on "obj-factory-v1-typeorm" that demonstrates Azure AD authorization code flow using passport-azure-ad.
The app allows you to validate access tokens v1 and v2. Specify in config.json file which version of the token should be checked.

### For installation and running app and tests use root README.md file
#### Local SWAGGER UI:

```bash
http://localhost:3000/api/docs/
```


### config.json file

To connect application to local PostgreSQL DB and Azure AD create config.json file in the root directory of obj-factory-v2-authn app with parameters:
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
    "APP_PROTOCOL": <app_protocol> (http/https),
    "APP_HOSTNAME": <app_hostname>,
    "APP_PORT": <app_port>
    "AZURE_CONFIG": {
        "ClIENT_ID": <azure_client_id>,
        "TENANT_ID": <azure_tenant_id>,
        "AUDIENCE" : <token_aud> ("api://1234"),
        "SCOPES": {
          "api://1234/ReadAccess": "ReadAccess"
        }
    }
}
```
- APP_PORT - the port on which the application is running. optional, default 3000
- CLIENT_ID and TENANT_ID can be viewed on the portal.azure.com -> Azure Ad -> App registrations -> <your_app> 

Important: SYNCHRONIZE option indicates if database schema should be auto created on every application launch. This option is useful during debug and development. **Don't use this option in production**, because you can lose production data.
#### To connect application to RDS use AWS credentials in config.json file as shown above.

### OPEN API
In order for swagger to receive the access token correctly, specify the redirect URL to portal.azure.com - appURL/api/docs/oauth2-redirect.html

In order for swagger to receive the access token correctly, specify the redirect URL to portal.azure.com - https://oauth.pstmn.io/v1/callback

