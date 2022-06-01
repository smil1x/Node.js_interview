import request from 'supertest';
import * as typeorm from 'typeorm';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { INestApplication } from '@nestjs/common';
import { TasksModule } from '../src/tasks/tasks.module';
import { ObjectRepository } from '../src/object/object.repository';
import { mockObjectRepository } from './mocks/object/object-repository.mock';
import { stubFailedTasks, stubTasksPartiallyFailed, stubTasksPayload, stubTasksSuccess } from './stubs/tasks';
import { stubObject } from '@app/common/test-utils/stubs';
import { stubGetContentColumnName, stubGetContentProps, stubUpdateContentResult } from './stubs/object';
import { mockConnection } from '@app/common/test-utils/mocks';
import { AuthGuard } from '@nestjs/passport';
import { AZURE_STRATEGY, JWT_STRATEGY } from '@app/auth';

const mockAxios = new MockAdapter(axios);

jest.mock('typeorm', () => ({
  ...(jest.requireActual('typeorm') as typeof typeorm),
  getConnection: jest.fn().mockImplementation(() => mockConnection),
}));

describe('Tasks', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [TasksModule],
    })
      .overrideGuard(AuthGuard([JWT_STRATEGY, AZURE_STRATEGY]))
      .useValue({
        canActivate: () => true,
      })
      .overrideProvider(getRepositoryToken(ObjectRepository))
      .useValue(mockObjectRepository)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  beforeEach(() => {
    mockAxios.resetHandlers();
    jest.spyOn(mockObjectRepository, 'getObject').mockReturnValue(stubObject);
    jest.spyOn(mockObjectRepository, 'checkParametersInContentSchema').mockReturnValue(true);
    jest.spyOn(mockObjectRepository, 'getContentColumnName').mockReturnValue(stubGetContentColumnName);
    jest.spyOn(mockObjectRepository, 'getContentProps').mockReturnValue(stubGetContentProps);
    jest.spyOn(mockObjectRepository, 'updateFields').mockReturnValue(stubUpdateContentResult);
  });

  it('/POST tasks success', async () => {
    mockAxios.onPost('example.com').reply(200, 1);

    return request(app.getHttpServer()).post('/tasks').send(stubTasksPayload).expect(200).expect(stubTasksSuccess);
  });

  it('/POST tasks failed', async () => {
    mockAxios.onPost('example.com').reply(() => {
      return [404];
    });

    return request(app.getHttpServer()).post('/tasks').send(stubTasksPayload).expect(200).expect(stubFailedTasks);
  });

  it('/POST tasks failed if parameters are not found in object content schema', async () => {
    jest.spyOn(mockObjectRepository, 'checkParametersInContentSchema').mockReturnValue(false);

    mockAxios.onPost('example.com').reply(() => {
      return [404];
    });

    return request(app.getHttpServer())
      .post('/tasks')
      .send({ ...stubTasksPayload, parameters: ['someColumn'] })
      .expect(404)
      .then((response) => {
        expect(response.body.response.message || response.body.message).toEqual(
          'The specified parameters are not found in the object content',
        );
      });
  });

  it('/POST tasks partially failed', async () => {
    mockAxios.onPost('example.com').replyOnce(200, 1).onPost('example.com').replyOnce(404);

    return request(app.getHttpServer())
      .post('/tasks')
      .send(stubTasksPayload)
      .expect(200)
      .expect(stubTasksPartiallyFailed);
  });

  afterAll(async () => {
    await app.close();
  });
});
