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
    AWS_OPTIONS: {
      description: 'The AWS services configuration options.',
      type: 'object',
      properties: {
        AWS_BUCKET_NAME: {
          description: 'The AWS S3 Bucket name.',
          type: 'string',
        },
      },
      required: ['AWS_BUCKET_NAME'],
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
    MAX_FILE_SIZE: {
      description: 'Max size of file to upload',
      type: 'number',
    },
    APP_PORT: {
      description: 'The port on which the application is running',
      type: 'number',
    },
    APP_PROTOCOL: {
      description: 'http/https',
      type: 'string',
    },
    APP_HOSTNAME: {
      description: 'The hostname of application',
      type: 'string',
    },
    AUTH_OPTIONS: {
      description: 'Authentication options (auth configuration for different strategies)',
      type: 'object',
      allOf: [{ required: ['azure_strategy'] }, { required: ['jwt_strategy'] }],
      properties: {
        azure_strategy: {
          description: 'Azure config for authentication',
          type: 'object',
          properties: {
            CLIENT_ID: {
              description: 'client id',
              type: 'string',
            },
            TENANT_ID: {
              description: 'tenant id',
              type: 'string',
            },
            AUDIENCE: {
              description: 'audience',
              type: 'string',
            },
            TOKEN_VERSION: {
              description: '1 or 2',
              type: 'integer',
              minimum: 1,
              maximum: 2,
            },
            SCOPES: {
              description: 'scopes',
              type: 'object',
              minProperties: 1,
            },
          },
          required: ['CLIENT_ID', 'TENANT_ID', 'AUDIENCE', 'TOKEN_VERSION', 'SCOPES'],
        },
        jwt_strategy: {
          description: 'Custom authentication config',
          type: 'object',
          properties: {
            secretKey: {
              description: 'Secret key to generate jwt tokens',
              type: 'string',
            },
          },
          required: ['secretKey'],
        },
      },
    },
  },
  required: ['AWS_OPTIONS', 'PG_CONFIG', 'APP_PROTOCOL', 'APP_HOSTNAME', 'AUTH_OPTIONS'],
});
