import { logLevelsValues, transportTypesValues } from '@app/common';

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
    APP_PORT: {
      description: 'The port on which the application is running',
      type: 'number',
    },
    LOGGER_CONFIG: {
      description: 'Logger Module Config',
      type: 'object',
      properties: {
        TRANSPORT_TYPE: {
          description: 'Transport Type - type of output or storage of your logs (example - CONSOLE)',
          type: 'string',
          enum: transportTypesValues,
        },
        LOG_LEVEL: {
          description: 'Log level',
          type: 'string',
          enum: logLevelsValues,
        },
      },
    },
  },
  required: ['PG_CONFIG'],
});
