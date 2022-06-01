import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ObjectModule } from '../src/object/object.module';
import { CreateObjectDto } from '../src/object/dto';
import { ObjectRepository } from '../src/object/object.repository';
import { mockObjectRepository } from './mocks/object';
import { stubObject, stubObjectsList, stubGetAllObjects, stubPutUpdateObject } from '@app/common/test-utils/stubs';
import { AZURE_STRATEGY, JWT_STRATEGY } from '@app/auth';

describe('ObjectModule (e2e) - /objects', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ObjectModule],
    })
      .overrideGuard(AuthGuard([JWT_STRATEGY, AZURE_STRATEGY]))
      .useValue({
        canActivate: () => true,
      })
      .overrideProvider(getRepositoryToken(ObjectRepository))
      .useValue(mockObjectRepository)
      .compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  it('/objects (POST)', async () => {
    jest.spyOn(mockObjectRepository, 'createObject').mockReturnValue(stubObject);

    const dto: CreateObjectDto = {
      name: 'test name',
      description: 'test description',
    };

    const data = await request(app.getHttpServer()).post('/objects').send(dto).expect(HttpStatus.CREATED);

    expect(data.body).toEqual({
      ...dto,
      id: stubObject.id,
    });
  });

  it('/objects/?page=1&pageSize=2 (GET /Get all objects with pagination)', async () => {
    jest.spyOn(mockObjectRepository, 'getAllObjects').mockReturnValue([stubObjectsList, stubObjectsList.length]);

    const data = await request(app.getHttpServer()).get('/objects/?page=1&pageSize=2').expect(HttpStatus.OK);

    expect(data.body).toEqual(stubGetAllObjects);
  });

  it('/objects/:id (PUT)', async () => {
    jest.spyOn(mockObjectRepository, 'putUpdateObject').mockReturnValue(stubPutUpdateObject);

    const dto: CreateObjectDto = {
      name: 'new name',
      description: 'new description',
    };
    const data = await request(app.getHttpServer()).put(`/objects/${stubObject.id}`).send(dto).expect(HttpStatus.OK);

    expect(data.body).toEqual({
      ...dto,
      id: stubObject.id,
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
