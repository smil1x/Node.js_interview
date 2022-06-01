import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  maxWorkers: 1,
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '@app/config/(.*)': '<rootDir>/libs/config/src/$1',
    '@app/config': '<rootDir>/libs/config/src',
    '@app/common/(.*)': '<rootDir>/libs/common/src/$1',
    '@app/common': '<rootDir>/libs/common/src',
    '^@app/auth(|/.*)$': '<rootDir>/libs/auth/src/$1',
    '^@app/aws(|/.*)$': '<rootDir>/libs/aws/src/$1',
  },
  coverageDirectory: './coverage',
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/libs/common/',
    '<rootDir>/apps/.*/test/mocks/',
    '<rootDir>/apps/.*/test/stubs/',
    '<rootDir>/libs/.*/test-utils/mocks/',
    '<rootDir>/libs/.*/test-utils/stubs/',
    '.mock.ts',
    '.stub.ts',
  ],
};

export default config;
