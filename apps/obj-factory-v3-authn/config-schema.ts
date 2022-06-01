export const getSchema = () => ({
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Configuration',
  description: 'APP Configuration',
  type: 'object',
  properties: {
    AWS_REGION: {
      description: 'The AWS Region.',
      type: 'string',
    },
    PG_CONFIG: {
      description: 'Database config',
      type: 'object',
      properties: {
        DATABASE_HOST: {
          description: 'Database host',
          type: 'string',
        },
        DATABASE_PORT: {
          description: 'Database port',
          type: 'number',
        },
        DATABASE_USERNAME: {
          description: 'Database User name',
          type: 'string',
        },
        DATABASE_PASSWORD: {
          description: 'Database password',
          type: 'string',
        },
        DATABASE_NAME: {
          description: 'Database name',
          type: 'string',
        },
        DATABASE_SYNCHRONIZE: {
          description:
            'Synchronize option - indicates if database schema should be auto created on every application launch.',
          type: 'boolean',
        },
      },
      required: [
        'DATABASE_HOST',
        'DATABASE_PORT',
        'DATABASE_USERNAME',
        'DATABASE_PASSWORD',
        'DATABASE_NAME',
        'DATABASE_SYNCHRONIZE',
      ],
    },
    APP_PROTOCOL: {
      description: 'http/https',
      type: 'string',
    },
    APP_HOSTNAME: {
      description: 'e. g. my-app.com or localhost',
      type: 'string',
    },
    APP_PORT: {
      description: 'The port on which the application is running',
      type: 'number',
    },
    COGNITO_CONFIG: {
      description: 'Cognito config',
      type: 'object',
      properties: {
        COGNITO_REGION: {
          description: 'cognito region',
          type: 'string',
        },
        POOL_ID: {
          description: 'cognito pool id',
          type: 'string',
        },
        CLIENT_ID: {
          description: 'cognito client id',
          type: 'string',
        },
        DOMAIN: {
          description: 'user pool domain',
          type: 'string',
        },
      },
      required: ['COGNITO_REGION', 'POOL_ID', 'CLIENT_ID', 'DOMAIN'],
    },
  },
  required: ['PG_CONFIG', 'APP_PROTOCOL', 'APP_HOSTNAME', 'COGNITO_CONFIG'],
});
