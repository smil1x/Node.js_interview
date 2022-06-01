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
    AWS_BUCKET_NAME: {
      description: 'The AWS S3 Bucket name.',
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
    JWT_SECRET: {
      description: 'Secret key to generate jwt tokens',
      type: 'string',
    },
    APP_PORT: {
      description: 'The port on which the application is running',
      type: 'number',
    },
  },
  required: ['PG_CONFIG', 'JWT_SECRET'],
});
