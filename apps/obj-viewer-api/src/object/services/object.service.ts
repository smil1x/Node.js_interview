import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ObjectEntity } from '@app/common/db/entities';
import { ObjectRepository } from '../object.repository';
import {
  CreateObjectDto,
  UpdateContentDto,
  UpdateObjectDto,
  FieldsKeyValue,
  CreateObjectResponse,
  DeleteObjectContentRowResponse,
  GetObjectContentResponse,
} from '../dto';
import { GetAllResponse } from '../../core/models';
import { ParserService } from './parser.service';
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
    return this.objectRepository.getObject(id);
  }

  async patchUpdateObject(id: string, updateObjectDto: UpdateObjectDto): Promise<ObjectEntity> {
    if (Object.keys(updateObjectDto).length === 0) {
      throw new BadRequestException('No parameters to make updates, please fill at least one field');
    }

    return this.objectRepository.patchUpdateObject(id, updateObjectDto);
  }

  async putUpdateObject(id: string, updateObjectDto: UpdateObjectDto): Promise<ObjectEntity> {
    return this.objectRepository.putUpdateObject(id, updateObjectDto);
  }

  async deleteObject(id: string): Promise<Partial<ObjectEntity>> {
    return this.objectRepository.deleteObject(id);
  }

  async getObjectContent(id: string, page: number, pageSize: number): Promise<GetObjectContentResponse> {
    return this.objectRepository.getObjectContent(id, page, pageSize);
  }

  async updateContent(id: string, updateContentDto: UpdateContentDto): Promise<FieldsKeyValue[]> {
    const { fields, contentId } = updateContentDto;
    const contentColumnName = await this.objectRepository.getContentColumnName(id);

    return this.objectRepository.updateFields(fields, id, contentId, contentColumnName);
  }

  async deleteContentRow(id: string, contentId: string): Promise<DeleteObjectContentRowResponse> {
    const contentColumnName = await this.objectRepository.getContentColumnName(id);
    const findContentRowQueryParams = [id, contentColumnName, contentId];
    const foundRow = await this.objectRepository.findContentRow(findContentRowQueryParams);

    return this.objectRepository.deleteContentRow(id, contentId, foundRow[0]);
  }
}
