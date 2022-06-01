import { QueryRunner } from 'typeorm';

export const mockQueryRunner = {
  manager: {},
} as QueryRunner;

export const mockQueryBuilder = {
  insert: jest.fn().mockReturnThis(),
  delete: jest.fn().mockReturnThis(),
  from: jest.fn().mockReturnThis(),
  update: jest.fn().mockReturnThis(),
  set: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  into: jest.fn().mockReturnThis(),
  values: jest.fn().mockReturnThis(),
  returning: jest.fn().mockReturnThis(),
  execute: jest.fn(),
};

Object.assign(mockQueryRunner.manager, {
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  query: jest.fn(),
  createQueryBuilder: jest.fn().mockImplementation(() => mockQueryBuilder),
  getCustomRepository: jest.fn(),
  getRepository: jest.fn(),
});

export const mockConnection = {
  connect: jest.fn(),
  close: jest.fn(),
  createQueryRunner: jest.fn().mockImplementation(() => {
    mockQueryRunner.connect = jest.fn();
    mockQueryRunner.release = jest.fn();
    mockQueryRunner.startTransaction = jest.fn();
    mockQueryRunner.commitTransaction = jest.fn();
    mockQueryRunner.rollbackTransaction = jest.fn();
    mockQueryRunner.release = jest.fn();
    return mockQueryRunner;
  }),
  getMetadata: jest.fn(),
  getRepository: jest.fn(),
  getCustomRepository: jest.fn(),
  getTreeRepository: jest.fn(),
};
