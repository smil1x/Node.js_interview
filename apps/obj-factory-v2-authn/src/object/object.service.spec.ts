import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';
import { ObjectService } from './object.service';
import { ObjectEntity } from '@app/common/db/entities';
import { ObjectRepository } from './object.repository';
import { mockObjectRepository } from '../../test/mocks/object';
import {
  stubObject,
  stubObjectsList,
  stubGetAllObjects,
  stubPutUpdateObject,
  stubPatchUpdateObject,
} from '@app/common/test-utils/stubs';

describe('ObjectService', () => {
  let objectService: ObjectService;
  let repository: Repository<ObjectEntity>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ObjectService,
        {
          provide: getRepositoryToken(ObjectRepository),
          useValue: mockObjectRepository,
        },
      ],
    }).compile();

    objectService = module.get<ObjectService>(ObjectService);
    repository = module.get<Repository<ObjectEntity>>(getRepositoryToken(ObjectRepository));
  });

  it('repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('objectService should be defined', () => {
    expect(objectService).toBeDefined();
  });

  it('should create new object', async () => {
    jest.spyOn(mockObjectRepository, 'createObject').mockReturnValue(stubObject);
    const data = await objectService.createObject({
      name: 'test name',
      description: 'test description',
    });
    expect(data).toEqual(stubObject);
  });

  it('should get all objects with pagination', async () => {
    jest.spyOn(mockObjectRepository, 'getAllObjects').mockReturnValue([stubObjectsList, stubObjectsList.length]);
    const page = 1;
    const pageSize = 2;
    const data = await objectService.getAllObjects(page, pageSize);
    expect(data).toEqual(stubGetAllObjects);
  });

  it('should get a single object', async () => {
    jest.spyOn(mockObjectRepository, 'getObject').mockReturnValue(stubObject);
    const data = await objectService.getObject(stubObject.id);
    expect(data).toEqual(stubObject);
  });

  it('should partially update object', async () => {
    jest.spyOn(mockObjectRepository, 'patchUpdateObject').mockReturnValue(stubPatchUpdateObject);
    const data = await objectService.patchUpdateObject(stubObject.id, {
      description: 'new description',
    });

    expect(data).toEqual(stubPatchUpdateObject);
  });

  it('should fully update object', async () => {
    jest.spyOn(mockObjectRepository, 'putUpdateObject').mockReturnValue(stubPutUpdateObject);
    const data = await objectService.putUpdateObject(stubObject.id, {
      name: 'new name',
      description: 'new description',
    });

    expect(data).toEqual(stubPutUpdateObject);
  });

  it('should delete object', async () => {
    jest.spyOn(mockObjectRepository, 'deleteObject').mockReturnValue(stubObject);
    const data = await objectService.deleteObject(stubObject.id);
    expect(data).toEqual(stubObject);
  });
});
