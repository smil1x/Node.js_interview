### Before starting work:
Create .env.local file in the root directory of client app. Put your own Azure AD options, for example:
```
REACT_APP_AZURE_CLIENT_ID=''
REACT_APP_AZURE_TENANT_ID=''
REACT_APP_MSAL_REDIRECT_URI='http://localhost:3001'
REACT_APP_AZURE_TOKEN_SCOPES=''

REACT_APP_SERVER_URL='http://localhost:3000'
```