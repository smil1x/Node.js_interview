import * as typeorm from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';
import { ObjectService } from './object.service';
import { ObjectRepository } from './object.repository';
import { mockObjectRepository } from '../../test/mocks/object';
import { AWS_CONFIG, S3Service } from '@app/aws';
import { mockS3Service } from '@app/aws/test-utils/mocks';
import {
  stubObject,
  stubPatchUpdateObject,
  stubPutUpdateObject,
  stubPresignedUrlUploadedFilesMetadata,
  stubS3UploadedFilesMetadata,
  stubUploadedFile,
  stubGetFileMetadataRow,
  testUserId,
  stubGetAllFiles,
} from '../../test/stubs/object';
import { mockQueryRunner, mockQueryBuilder, mockConnection } from '@app/common/test-utils/mocks';
import { config } from '../../test/stubs/config/config.stub';

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
    jest.spyOn(mockQueryBuilder, 'execute').mockImplementationOnce(() => Promise.resolve({ raw: [stubObject] }));

    const data = await objectService.createObject(
      {
        name: 'test object',
        description: 'test description',
        metadata: { test: 'test metadata' },
      },
      testUserId,
    );

    expect(mockQueryRunner.manager.query).toHaveBeenCalled();
    expect(mockQueryRunner.manager.createQueryBuilder).toHaveBeenCalled();
    expect(data).toEqual(stubObject);
  });

  it('should partially update object', async () => {
    jest.spyOn(mockQueryRunner.manager, 'update').mockResolvedValue({ generatedMaps: [], raw: [], affected: 1 });
    jest.spyOn(mockQueryRunner.manager, 'findOne').mockResolvedValue(stubPatchUpdateObject);

    const data = await objectService.patchUpdateObject(
      stubObject.id,
      {
        description: 'new description',
      },
      testUserId,
    );

    expect(mockQueryRunner.manager.query).toHaveBeenCalled();
    expect(mockQueryRunner.manager.update).toHaveBeenCalled();
    expect(mockQueryRunner.manager.findOne).toHaveBeenCalled();
    expect(data).toEqual(stubPatchUpdateObject);
  });

  it('should fully update object', async () => {
    jest.spyOn(mockQueryRunner.manager, 'findOne').mockResolvedValue(stubObject);
    jest
      .spyOn(mockQueryBuilder, 'execute')
      .mockImplementationOnce(() => Promise.resolve({ raw: [stubPutUpdateObject] }));

    const data = await objectService.putUpdateObject(
      stubObject.id,
      {
        name: 'new name',
        description: 'new description',
      },
      testUserId,
    );

    expect(mockQueryRunner.manager.query).toHaveBeenCalled();
    expect(mockQueryRunner.manager.createQueryBuilder).toHaveBeenCalled();
    expect(data).toEqual(stubPutUpdateObject);
  });

  beforeEach(() => {
    jest.spyOn(mockQueryRunner.manager, 'getCustomRepository').mockReturnValue(mockObjectRepository);
  });

  it('should return files metadata (presignedUrl)', async () => {
    jest.spyOn(mockS3Service, 'getSignedUrlPromise').mockReturnValue('test url');
    const data = await objectService.getPresignedUrl(stubObject.id, { fileNames: ['test.png'] }, testUserId);

    expect(mockQueryRunner.manager.query).toHaveBeenCalled();
    expect(mockObjectRepository.updateObjectMetadata).toHaveBeenCalled();

    expect(data).toEqual(stubPresignedUrlUploadedFilesMetadata);
  });

  it('should return files metadata (s3Service upload)', async () => {
    const data = await objectService.uploadFilesToBucket(stubObject.id, [stubUploadedFile], testUserId);

    expect(mockQueryRunner.manager.query).toHaveBeenCalled();
    expect(mockObjectRepository.updateObjectMetadata).toHaveBeenCalled();

    expect(data).toEqual(stubS3UploadedFilesMetadata);
  });

  it('should get all files', async () => {
    jest.spyOn(mockObjectRepository, 'getAllFiles').mockReturnValue(stubGetAllFiles);

    const data = await objectService.getAllFiles(stubObject.id, 1, 5, false);

    expect(mockObjectRepository.getAllFiles).toHaveBeenCalled();

    expect(data).toEqual({
      id: stubObject.id,
      page: 1,
      pageSize: 5,
      totalUploadedFiles: stubGetAllFiles.totalUploadedFiles,
      retrievedFiles: stubGetAllFiles.retrievedFiles,
    });
  });

  it('should delete file', async () => {
    jest.spyOn(mockObjectRepository, 'getFileMetadataRow').mockReturnValue(stubGetFileMetadataRow);
    jest
      .spyOn(mockObjectRepository, 'deleteFile')
      .mockReturnValue({ id: stubObject.id, deletedFileMetadata: stubGetFileMetadataRow[0].row });

    const data = await objectService.deleteFile(stubObject.id, 'test.png', testUserId);

    expect(mockQueryRunner.manager.query).toHaveBeenCalled();
    expect(mockObjectRepository.deleteFile).toHaveBeenCalled();
    expect(mockQueryRunner.manager.createQueryBuilder).toHaveBeenCalled();

    expect(data).toEqual({ id: stubObject.id, deletedFileMetadata: stubGetFileMetadataRow[0].row });
  });
});
