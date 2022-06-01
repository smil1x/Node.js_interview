# HealthCheckUiNg

## Description

Here you can find a list of applications (server and client) that demonstrate functionality such as: CRUD operations, files uploading, authentication (using local, Azure Active Directory and AWS Cognito strategies).

Presented server-side apps are built with NestJS framework and client apps with ReactJS library and Angular framework.

## Tech Stack

**Client:** Angular, Material UI, Azure AD

**Server:** NestJS, Postgres, Typeorm, AWS

**Common:** Typescript

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/apps` directory.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## ms-config json file

```
export const msConfig = {
  AUTH_KEY: 'https://login.microsoftonline.com/<Directory (tenant) ID}>',
  CLIENT_ID: <Application (client) ID>,
  SCOPE: 'api://<Application (client) ID>/<Scope name>',
  GRAPH_PATH: 'https://graph.microsoft.com/v1.0/me',
  USER_GRAPH: <User scope name>,
};
```
