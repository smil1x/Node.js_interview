import { getRepositoryToken } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';
import { AWS_CONFIG, S3Service } from '@app/aws';
import { ParserService, ObjectService } from './services';
import { ObjectRepository } from './object.repository';
import { mockObjectRepository } from '../../test/mocks/object/object-repository.mock';
import { mockS3Service } from '@app/aws/test-utils/mocks';
import {
  stubObject,
  stubObjectsList,
  stubPatchUpdateObject,
  stubPutUpdateObject,
  stubGetAllObjects,
  paginationQueryParams,
} from '@app/common/test-utils/stubs';
import {
  stubCreateObjectResponse,
  stubUploadedFile,
  stubUpdateContentResult,
  stubGetObjectContent,
  stubGetContentColumnName,
  stubFindContentRow,
  stubDeleteObjectContentRow,
} from '../../test/stubs/object';
import { XLSX_PACKAGE_TOKEN } from '../core/constants';
import * as XLSX from 'xlsx';
import { mockConnection } from '@app/common/test-utils/mocks';
import * as typeorm from 'typeorm';
import { config } from '../../../obj-factory-v1-multifile-storage/test/stubs/config/config.stub';

jest.mock('typeorm', () => ({
  ...(jest.requireActual('typeorm') as typeof typeorm),
  getConnection: jest.fn().mockImplementation(() => mockConnection),
}));

describe('ObjectService', () => {
  let objectService: ObjectService;
  let repository: ObjectRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ObjectService,
        {
          provide: getRepositoryToken(ObjectRepository),
          useValue: mockObjectRepository,
        },
        ParserService,
        {
          provide: XLSX_PACKAGE_TOKEN,
          useValue: XLSX,
        },
        S3Service,
        {
          provide: AWS_CONFIG,
          useValue: config.AWS_OPTIONS,
        },
      ],
    })
      .overrideProvider(S3Service)
      .useValue(mockS3Service)
      .compile();

    objectService = module.get<ObjectService>(ObjectService);
    repository = module.get<ObjectRepository>(getRepositoryToken(ObjectRepository));
  });

  it('repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('objectService should be defined', () => {
    expect(objectService).toBeDefined();
  });

  it('should create new object', async () => {
    jest.spyOn(mockObjectRepository, 'createObject').mockReturnValue(stubCreateObjectResponse);

    const data = await objectService.createObject(
      {
        name: 'test object',
        description: 'test description',
        file: '',
      },
      stubUploadedFile,
    );
    expect(data).toEqual(stubCreateObjectResponse);
  });

  it('should get all objects with pagination', async () => {
    jest.spyOn(mockObjectRepository, 'getAllObjects').mockReturnValue([stubObjectsList, stubObjectsList.length]);
    const { page, pageSize } = paginationQueryParams;

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

  it('should update content field', async () => {
    jest.spyOn(mockObjectRepository, 'getContentColumnName').mockReturnValue(stubGetContentColumnName);
    jest.spyOn(mockObjectRepository, 'updateFields').mockReturnValue(stubUpdateContentResult);

    const data = await objectService.updateContent(stubObject.id, {
      contentId: 2,
      fields: [{ key: 'sites', value: 'Smallville' }],
    });

    expect(mockObjectRepository.updateFields).toHaveBeenCalled();
    expect(data).toEqual(stubUpdateContentResult);
  });

  it('should get object content with pagination', async () => {
    jest.spyOn(mockObjectRepository, 'getObject').mockReturnValue(stubObject);
    jest.spyOn(mockObjectRepository, 'getObjectContent').mockReturnValue(stubGetObjectContent);
    const { page, pageSize } = paginationQueryParams;

    const data = await objectService.getObjectContent(stubObject.id, page, pageSize);
    expect(data).toEqual(stubGetObjectContent);
  });

  it('should delete content item by contentId', async () => {
    jest.spyOn(mockObjectRepository, 'getContentColumnName').mockReturnValue(stubGetContentColumnName);
    jest.spyOn(mockObjectRepository, 'findContentRow').mockReturnValue(stubFindContentRow);
    jest.spyOn(mockObjectRepository, 'deleteContentRow').mockReturnValue(stubDeleteObjectContentRow);

    const contentId = '1';
    const data = await objectService.deleteContentRow(stubObject.id, contentId);

    expect(mockObjectRepository.deleteContentRow).toHaveBeenCalled();
    expect(data).toEqual(stubDeleteObjectContentRow);
  });
});
