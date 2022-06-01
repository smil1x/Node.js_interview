## Description

### Obj-factory-v3-authn
The application based on "obj-factory-v1-typeorm" that demonstrates AWS Cognito authorization using passport-jwt. The app allows you to validate access token and id token.

### For installation and running app and tests use root README.md file
#### Local SWAGGER UI:

```bash
http://localhost:3000/api/docs/
```


### config.json file

To connect application to local PostgreSQL DB and AWS Cognito create config.json file in the root directory of obj-factory-v3-authn app with parameters:
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
    "COGNITO_CONFIG": {
        "COGNITO_REGION": <cognito_region>,
        "POOL_ID": <cognito_user_pool_id>,
        "CLIENT_ID" : <cognito_client_id>,
        "DOMAIN" : <cognito_domain>,
    }
  }
```
- APP_PORT - the port on which the application is running. optional, default 3000

- POOL_ID - AWS Cognito -> \<your user pool\> -> General setting
- CLIENT_ID - AWS Cognito -> \<your user pool\> -> App integration -> App client settings -> ID
- DOMAIN - AWS Cognito -> \<your user pool\> -> App integration -> Domain name

Important: SYNCHRONIZE option indicates if database schema should be auto created on every application launch. This option is useful during debug and development. **Don't use this option in production**, because you can lose production data.
#### To connect application to RDS use AWS credentials in config.json file as shown above.

### OPEN API
In order for swagger to receive the access token correctly, specify the redirect URL to AWS Cognito -> \<your user pool\> -> App integration -> App client settings -> Callback URL(s) - appURL/api/docs/oauth2-redirect.html

In order for postman to receive the access token correctly, specify the redirect URL to AWS Cognito -> \<your user pool\> -> App integration -> App client settings -> Callback URL(s) - https://oauth.pstmn.io/v1/callback

### Configuring authentication with AWS Cognito

Step 1. Create a user pool

Step 2. Add an app to enable the hosted web UI

Step 3. Add social sign-in to a user pool (optional)

Step 4. Add sign-in with a SAML identity provider to a user pool (optional)

All steps are detailed here: https://docs.aws.amazon.com/cognito/latest/developerguide/getting-started-with-cognito-user-pools.html


**Important:**
- You can’t change the sign-in and attribute options after you’ve created your user pool.
- If you are going to add LinkedIn as a social identity provider, keep the standard attribute email selected when creating your user pool. Guide on how to add LinkedIn as a social identity provider - https://aws.amazon.com/ru/premiumsupport/knowledge-center/cognito-linkedin-auth0-social-idp/
