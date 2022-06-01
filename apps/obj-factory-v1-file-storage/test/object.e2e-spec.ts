import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ObjectModule } from '../src/object/object.module';
import { ObjectRepository } from '../src/object/object.repository';
import { mockObjectRepository } from './mocks/object';
import { AwsModule, S3Service } from '@app/aws';
import { mockS3Service } from '@app/aws/test-utils/mocks';
import {
  stubObject,
  stubObjectsList,
  stubPatchUpdateObject,
  stubGetAllObjects,
  paginationQueryParams,
} from '@app/common/test-utils/stubs';
import { stubCreateObjectResponse, stubUploadedFile, stubGetObjectContent } from './stubs/object';
import { config } from './stubs/config/config.stub';
import { AuthGuard } from '@nestjs/passport';
import { AZURE_STRATEGY, JWT_STRATEGY } from '@app/auth';

describe('ObjectModule (e2e) - /objects', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ObjectModule.register({ config }), AwsModule.register(config.AWS_OPTIONS)],
    })
      .overrideGuard(AuthGuard([JWT_STRATEGY, AZURE_STRATEGY]))
      .useValue({
        canActivate: () => true,
      })
      .overrideProvider(S3Service)
      .useValue(mockS3Service)
      .overrideProvider(getRepositoryToken(ObjectRepository))
      .useValue(mockObjectRepository)
      .compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  it('/objects (POST) Create new object', async () => {
    jest.spyOn(mockObjectRepository, 'createObject').mockReturnValue(stubCreateObjectResponse);

    const data = await request(app.getHttpServer())
      .post('/objects')
      .field('name', 'test name')
      .field('description', 'test description')
      .attach('file', stubUploadedFile.buffer, 'test.xlsx')
      .expect(HttpStatus.CREATED);

    expect(data.body).toEqual({
      ...stubCreateObjectResponse,
      createdAt: stubCreateObjectResponse.createdAt.toISOString(),
      updatedAt: stubCreateObjectResponse.updatedAt.toISOString(),
    });
  });

  it('/objects (POST) Fails to update existing object with incorrect id format', async () => {
    jest.spyOn(mockObjectRepository, 'createObject').mockReturnValue(stubCreateObjectResponse);

    const data = await request(app.getHttpServer())
      .post('/objects')
      .field('id', '123')
      .field('name', 'test object')
      .field('description', 'test description')
      .attach('file', stubUploadedFile.buffer, 'test.xlsx')
      .expect(HttpStatus.BAD_REQUEST);

    expect(data.body.response.message).toEqual(['id must be a UUID']);
  });

  it('/objects/:id (Get) Get single object', async () => {
    jest.spyOn(mockObjectRepository, 'getObject').mockReturnValue(stubObject);

    const data = await request(app.getHttpServer()).get(`/objects/${stubObject.id}`).expect(HttpStatus.OK);

    expect(data.body).toEqual(stubObject);
  });

  it('/objects/?page=<>&pageSize=<> (GET) Get all objects with pagination', async () => {
    jest.spyOn(mockObjectRepository, 'getAllObjects').mockReturnValue([stubObjectsList, stubObjectsList.length]);
    const { page, pageSize } = paginationQueryParams;

    const data = await request(app.getHttpServer())
      .get(`/objects/?page=${page}&pageSize=${pageSize}`)
      .expect(HttpStatus.OK);

    expect(data.body).toEqual(stubGetAllObjects);
  });

  it('/objects/:id (PATCH) Partially update object', async () => {
    jest.spyOn(mockObjectRepository, 'patchUpdateObject').mockReturnValue(stubPatchUpdateObject);

    const data = await request(app.getHttpServer())
      .patch(`/objects/${stubObject.id}`)
      .send({ description: 'new description' })
      .expect(HttpStatus.OK);

    expect(data.body).toEqual(stubPatchUpdateObject);
  });

  it('/objects/:id (Delete) Delete object', async () => {
    jest.spyOn(mockObjectRepository, 'deleteObject').mockReturnValue(stubObject);

    const data = await request(app.getHttpServer()).delete(`/objects/${stubObject.id}`).expect(HttpStatus.OK);

    expect(data.body).toEqual(stubObject);
  });

  it('/objects/:id/content?page=<>&pageSize=<> (GET) Get object content with pagination', async () => {
    jest.spyOn(mockObjectRepository, 'getObject').mockReturnValue(stubObject);
    jest.spyOn(mockObjectRepository, 'getObjectContent').mockReturnValue(stubGetObjectContent);
    const { page, pageSize } = paginationQueryParams;

    const data = await request(app.getHttpServer())
      .get(`/objects/${stubObject.id}/content/?page=${page}&pageSize=${pageSize}`)
      .expect(HttpStatus.OK);

    expect(data.body).toEqual(stubGetObjectContent);
  });

  afterAll(async () => {
    await app.close();
  });
});
