import { Inject, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Express } from 'express';
import { plainToClass } from 'class-transformer';
import { ObjectEntity } from './object.entity';
import { ObjectRepository } from './object.repository';
import {
  ObjectPostDto,
  ObjectPatchDto,
  ObjectPutDto,
  FilesPostJsonDto,
  GetPresignedUrlsResponse,
  UploadFilesToBucketResponse,
  GetAllFilesResponse,
  GetFileResponse,
  DeleteFileResponse,
} from './dto';
import { GetAllResponse } from '../core/models';
import { composeResponse, generateFilesMetadata, generateS3Key, getSkipParameter } from '../core/utils';
import { FileS3Operations } from '../core/constants';
import { TransactionWrapper } from '@app/common/decorators';
import { setSessionUserQuery } from '@app/common/db/queries';
import { AWS_CONFIG, S3Service } from '@app/aws';
import { AwsConfigInterface } from '@app/aws/interfaces';

@Injectable()
export class ObjectService {
  constructor(
    private objectRepository: ObjectRepository,
    @Inject(AWS_CONFIG) protected readonly awsConfig: AwsConfigInterface,
    private s3Service: S3Service,
  ) {}

  @TransactionWrapper
  async createObject(dto: ObjectPostDto, userId, entityManager: EntityManager = null): Promise<ObjectEntity> {
    await entityManager.query(setSessionUserQuery(userId));

    return entityManager
      .createQueryBuilder()
      .insert()
      .into(ObjectEntity)
      .values({
        ...dto,
        createdBy: () => "current_setting('current.userId')",
        updatedBy: () => "current_setting('current.userId')",
      })
      .returning('*')
      .execute()
      .then((result) => plainToClass(ObjectEntity, result.raw[0]));
  }

  async getAllObjects(page: number, pageSize: number): Promise<GetAllResponse<ObjectEntity>> {
    const skip = getSkipParameter(page, pageSize);
    const [objectsList, total] = await this.objectRepository.findAndCount({
      skip,
      take: pageSize,
    });

    return {
      total,
      page,
      pageSize,
      data: objectsList,
    };
  }

  async getObject(id: string): Promise<ObjectEntity> {
    return this.objectRepository.findOne(id);
  }

  @TransactionWrapper
  async patchUpdateObject(
    id: string,
    dto: ObjectPatchDto,
    userId: string,
    entityManager: EntityManager = null,
  ): Promise<ObjectEntity> {
    await entityManager.query(setSessionUserQuery(userId));

    const updateResult = await entityManager.update(ObjectEntity, id, {
      ...dto,
      updatedBy: () => "current_setting('current.userId')",
      updatedAt: () => 'current_timestamp(0)',
    });

    if (updateResult.affected) {
      return entityManager.findOne(ObjectEntity, id);
    }
  }

  @TransactionWrapper
  async putUpdateObject(
    id: string,
    dto: ObjectPutDto,
    userId,
    entityManager: EntityManager = null,
  ): Promise<ObjectEntity> {
    await entityManager.query(setSessionUserQuery(userId));

    const foundObject = await entityManager.findOne(ObjectEntity, id);
    const objectToUpdate = Object.assign(foundObject, dto);

    return entityManager
      .createQueryBuilder()
      .update(ObjectEntity)
      .set({
        ...objectToUpdate,
        createdBy: () => "current_setting('current.userId')",
        updatedBy: () => "current_setting('current.userId')",
        updatedAt: () => 'current_timestamp(0)',
      })
      .where('"objectId" = :id', { id })
      .returning('*')
      .execute()
      .then((result) => plainToClass(ObjectEntity, result.raw[0]));
  }

  async deleteObject(id: string): Promise<Partial<ObjectEntity>> {
    const foundObject = await this.objectRepository.findOne(id);
    const deletedObject = await this.objectRepository.remove(foundObject);
    return { ...deletedObject, id };
  }

  @TransactionWrapper
  async uploadFilesToBucket(
    id: string,
    files: Express.Multer.File[],
    userId: string,
    entityManager: EntityManager = null,
  ): Promise<UploadFilesToBucketResponse> {
    const filesMetadata = generateFilesMetadata(files, id, userId, this.awsConfig.AWS_BUCKET_NAME);

    await entityManager.query(setSessionUserQuery(userId));
    await entityManager.getCustomRepository(ObjectRepository).updateObjectMetadata(id, filesMetadata);

    const promiseDataset = files.map(async (file, idx) => {
      return this.s3Service
        .putObject({
          Bucket: this.awsConfig.AWS_BUCKET_NAME,
          Body: file.buffer,
          Key: filesMetadata[idx].s3Key,
        })
        .then(() => ({ [`${file.originalname}`]: `Successfully uploaded.` }))
        .catch((error) => ({ [`${file.originalname}`]: `Failed to upload: ${error}` }));
    });

    const uploadedFiles = await Promise.all(promiseDataset);

    return {
      id,
      filesMetadata: composeResponse(uploadedFiles, filesMetadata, FileS3Operations.uploadToS3Bucket),
    };
  }

  @TransactionWrapper
  async getPresignedUrl(
    id: string,
    dto: FilesPostJsonDto,
    userId: string,
    entityManager: EntityManager = null,
  ): Promise<GetPresignedUrlsResponse> {
    const uniqueFileNames = [...new Set(dto.fileNames)];
    const filesMetadata = generateFilesMetadata(uniqueFileNames, id, userId, this.awsConfig.AWS_BUCKET_NAME);
    await entityManager.query(setSessionUserQuery(userId));

    await entityManager.getCustomRepository(ObjectRepository).updateObjectMetadata(id, filesMetadata);

    const promiseDataset = filesMetadata.map(async (file, idx) => ({
      [`${file.fileName}`]: await this.s3Service.getSignedUrlPromise('putObject', {
        Bucket: this.awsConfig.AWS_BUCKET_NAME,
        Key: filesMetadata[idx].s3Key,
      }),
    }));

    const presignedUrls = await Promise.all(promiseDataset);

    return {
      id,
      filesMetadataAndPresignedUrl: composeResponse(presignedUrls, filesMetadata, FileS3Operations.presignedUrl),
    };
  }

  async getAllFiles(id: string, page: number, pageSize: number, presignedUrl: boolean): Promise<GetAllFilesResponse> {
    const { totalUploadedFiles, retrievedFiles } = await this.objectRepository.getAllFiles(id, page, pageSize);

    let presignedUrls;
    if (presignedUrl) {
      const promiseDataset = retrievedFiles?.map(async (file) => ({
        [`${file.fileName}`]: await this.s3Service.getPresignedUrlIfExists('getObject', {
          Bucket: this.awsConfig.AWS_BUCKET_NAME,
          Key: file.s3Key,
          Expires: this.awsConfig.AWS_S3_SIGNED_URL_EXPIRING,
        }),
      }));

      presignedUrls = await Promise.all(promiseDataset);
    }

    return {
      id,
      page,
      pageSize,
      totalUploadedFiles,
      retrievedFiles: presignedUrl
        ? composeResponse(presignedUrls, retrievedFiles, FileS3Operations.presignedUrl)
        : retrievedFiles,
    };
  }

  async getFile(id: string, fileName: string, userId: string): Promise<GetFileResponse> {
    const fileS3Key = generateS3Key(id, userId, fileName);
    const findFileRowQueryParams = [id, fileS3Key];
    const [{ row }] = await this.objectRepository.getFileMetadataRow(findFileRowQueryParams);

    const presignedUrl = await this.s3Service.getPresignedUrlIfExists('getObject', {
      Bucket: this.awsConfig.AWS_BUCKET_NAME,
      Key: row.s3Key,
      Expires: this.awsConfig.AWS_S3_SIGNED_URL_EXPIRING,
    });

    return {
      id,
      fileMetadata: row,
      presignedUrl,
    };
  }

  @TransactionWrapper
  async deleteFile(
    id: string,
    fileName: string,
    userId: string,
    entityManager: EntityManager = null,
  ): Promise<DeleteFileResponse> {
    await entityManager.query(setSessionUserQuery(userId));

    const fileS3Key = generateS3Key(id, userId, fileName);
    const findFileRowQueryParams = [id, fileS3Key];
    const [{ row, rowNumber }] = await entityManager
      .getCustomRepository(ObjectRepository)
      .getFileMetadataRow(findFileRowQueryParams);

    await this.s3Service.deleteObject({
      Bucket: this.awsConfig.AWS_BUCKET_NAME,
      Key: row.s3Key,
    });

    return entityManager.getCustomRepository(ObjectRepository).deleteFile(id, fileName, userId, row, rowNumber);
  }
}
