## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start <app_name>

# watch mode
$ yarn run start:dev <app_name>

# production mode
$ yarn run start:prod <app_name>
```

## Test

```bash
# all unit tests
$ yarn run test

# unit tests for app/library
$ yarn run test <app_name>/<library_name>

# all e2e tests
$ yarn run test:e2e

# e2e tests for app/library
$ yarn run test:e2e <app_name>/<library_name>

# all test coverage
$ yarn run test:cov

# test coverage for app/library
$ yarn run test:e2e <app_name>/<library_name>
```

## Build and Serve Code Documentation
```
# Serve documentation on default port (8080)
$ yarn run server:docs

# Serve documentation on custom port
$ PORT=<port_number> yarn run server:docs
```

## Generate and deploy Lambdas

### Adding new lambda

To add new lambda use the following commands:

```bash
# This is needed to build project schematics locally to use custom commands.
$ npm run build-schematics

# Run nest cli with custom command (schematic)
$ nest generate lambda <lambda_name>

# Example
$ nest generate lambda test-lambda
```

Also, there will be a prompt with several questions:

1. Which project would you like to generate to? ---> Use default (src)
2. What name would you like to use for the lambda? ---> Add lambda name if you run `nest generate lambda` without name provision

This will generate full code base for further development (no additional work needed).

### Deploying new lambda

As prerequisites for deploying Lambda from local machine you need to have a relevant AWS credentials profile set up.

```bash
# Set up profile in ~/.aws/credentials
$ nano ~/.aws/credentials

# Use this pattern
[dev-bp]
aws_access_key_id = <ACCESS_KEY_ID>
aws_secret_access_key = <SECRET_ACCESS_KEY>
```

To deploy your lambda make sure it exists as a resource in AWS (`bp-dev-<lambda-name>` where `bp` - is product code, `dev` - environment)
```bash
$ ./deploy-lambdas.sh <lambda-name> dev
```


[Non functional requirements](NFRs.md)

[Summory table for ORMs](ORMSummory.md)