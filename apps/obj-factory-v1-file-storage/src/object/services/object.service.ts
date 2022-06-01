import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ObjectEntity } from '@app/common/db/entities';
import { ObjectRepository } from '../object.repository';
import { CreateObjectDto, UpdateObjectDto, CreateObjectResponse, GetObjectContentResponse } from '../dto';
import { GetAllResponse } from '../../core/models';
import { ParserService } from './parser.service';
import { objNotFoundMsg } from '@app/common';
import { AWS_CONFIG, S3Service } from '@app/aws';
import { AwsConfigInterface } from '@app/aws/interfaces';

@Injectable()
export class ObjectService {
  constructor(
    private objectRepository: ObjectRepository,
    @Inject(AWS_CONFIG) protected readonly awsConfig: AwsConfigInterface,
    private s3Service: S3Service,
    private parserService: ParserService,
  ) {}

  async createObject(createObjectDto: CreateObjectDto, file: Express.Multer.File): Promise<CreateObjectResponse> {
    const { commonFileInfo, parsedFile } = this.parserService.parseFileToJson(file, createObjectDto.name);

    if (createObjectDto.id) {
      await this.getObject(createObjectDto.id);
    }

    const savedObject = await this.objectRepository.createObject(createObjectDto, parsedFile, commonFileInfo);

    const {
      metadata: { s3Key },
    } = savedObject;

    await this.s3Service.putObject({
      Bucket: this.awsConfig.AWS_BUCKET_NAME,
      Body: file.buffer,
      Key: s3Key,
    });

    return savedObject;
  }

  async getAllObjects(page: number, pageSize: number): Promise<GetAllResponse<ObjectEntity>> {
    const [objectsList, total] = await this.objectRepository.getAllObjects(page, pageSize);

    return {
      total,
      page,
      pageSize,
      data: objectsList,
    };
  }

  async getObject(id: string): Promise<ObjectEntity> {
    const retrievedObject = await this.objectRepository.getObject(id);

    if (!retrievedObject) {
      throw new NotFoundException(objNotFoundMsg(id));
    }
    return retrievedObject;
  }

  async patchUpdateObject(id: string, updateObjectDto: UpdateObjectDto): Promise<ObjectEntity> {
    if (Object.keys(updateObjectDto).length === 0) {
      throw new BadRequestException('No parameters to make updates, please fill at least one field');
    }

    const updatedObject = await this.objectRepository.patchUpdateObject(id, updateObjectDto);

    if (!updatedObject) {
      throw new NotFoundException(objNotFoundMsg(id));
    }
    return updatedObject;
  }

  async putUpdateObject(id: string, updateObjectDto: UpdateObjectDto): Promise<ObjectEntity> {
    const updatedObject = await this.objectRepository.putUpdateObject(id, updateObjectDto);

    if (!updatedObject) {
      throw new NotFoundException(objNotFoundMsg(id));
    }
    return updatedObject;
  }

  async deleteObject(id: string): Promise<Partial<ObjectEntity>> {
    const deletedObject = await this.objectRepository.deleteObject(id);

    if (!deletedObject) {
      throw new NotFoundException(objNotFoundMsg(id));
    }
    return deletedObject;
  }

  async getObjectContent(id: string, page: number, pageSize: number): Promise<GetObjectContentResponse> {
    const foundObject = await this.getObject(id);
    if (foundObject) {
      return this.objectRepository.getObjectContent(id, page, pageSize);
    }
  }
}
