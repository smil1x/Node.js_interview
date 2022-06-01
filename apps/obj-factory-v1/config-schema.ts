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
      },
      required: ['DATABASE_HOST', 'DATABASE_PORT', 'DATABASE_USERNAME', 'DATABASE_PASSWORD', 'DATABASE_NAME'],
    },
    APP_PORT: {
      description: 'The port on which the application is running',
      type: 'number',
    },
  },
  required: ['PG_CONFIG'],
});
