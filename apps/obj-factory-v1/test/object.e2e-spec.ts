import request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { ObjectModule } from '../src/object/object.module';
import { CreateObjectDto } from '../src/object/dto';
import { PG_CONNECTION } from '../src/core/constants';
import { DbModule } from '../src/db/db.module';
import { ObjectDao } from '../src/object/object-dao';

const mockPoolClient = {
  query: jest.fn(),
};

const stubObjectsList = [
  {
    objectId: '36ab2f97-9650-4265-bcea-8c91c4ae732b',
    name: 'name post test',
    description: 'description post test',
  },
  {
    objectId: '7b03ce5f-7b4f-4a26-9540-d44cdeb79183',
    name: 'name post test',
    description: 'description post test',
  },
  {
    objectId: '487113f4-14d8-4e6f-b72f-9d346a864c12',
    name: 'name post test',
    description: 'description post test',
  },
];

const stubObject = {
  id: '36ab2f97-9650-4265-bcea-8c91c4ae732b',
  name: 'name post test',
  description: 'description post test',
};

describe('[Feature] Objects - /objects', () => {
  let app: INestApplication;
  const objectsDao = {
    create: jest.fn().mockResolvedValue(stubObject),
    findAll: jest.fn().mockResolvedValue({ total: 2, rows: stubObjectsList }),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ObjectModule,
        DbModule.register({
          DATABASE_HOST: '',
          DATABASE_PORT: 5432,
          DATABASE_USERNAME: '',
          DATABASE_PASSWORD: '',
          DATABASE_NAME: '',
        }),
      ],
    })
      .overrideProvider(PG_CONNECTION)
      .useValue(mockPoolClient)
      .overrideProvider(ObjectDao)
      .useValue(objectsDao)
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: false,
        },
      }),
    );
    await app.init();
  });

  it(`/GET objects`, () => {
    jest.spyOn(mockPoolClient, 'query').mockResolvedValue({ rows: stubObjectsList });

    return request(app.getHttpServer())
      .get('/objects/?pageSize=2&page=1')
      .expect(HttpStatus.OK)
      .expect({ pageSize: 2, page: 1, total: 2, data: stubObjectsList });
  });

  it('/POST object', () => {
    jest.spyOn(mockPoolClient, 'query').mockResolvedValue({ rows: [stubObject] });

    const dto = {
      name: 'name post test',
      description: 'description post test',
    };
    return request(app.getHttpServer())
      .post('/objects')
      .send(dto as CreateObjectDto)
      .expect(HttpStatus.CREATED)
      .then(({ body }) => {
        expect(body).toEqual(stubObject);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
