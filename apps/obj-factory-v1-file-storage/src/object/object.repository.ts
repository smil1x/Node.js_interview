import { EntityRepository, Repository } from 'typeorm';
import * as uuid from 'uuid';
import { pick } from 'lodash';
import { ObjectEntity } from '@app/common/db/entities';
import { CreateObjectDto, UpdateObjectDto, CreateObjectResponse, GetObjectContentResponse } from './dto';
import { IObjectToSave, IObjectMetadata } from './object.interface';
import { DATA_CLASSIFICATION_NAMESPACE, USER_NAMESPACE } from '../core/constants';
import { getSkipParameter } from '../core/utils';
import { formatString } from '@app/common';

@EntityRepository(ObjectEntity)
export class ObjectRepository extends Repository<ObjectEntity> {
  // userUuid and dataClassificationUuid are temporarily here
  private userUuid = uuid.v5('user', USER_NAMESPACE);
  private dataClassificationUuid = uuid.v5('files', DATA_CLASSIFICATION_NAMESPACE);

  /**
   * Creates new object to save in "object" table. If "id" provided then updates exising object.
   */
  async createObject(
    createObjectDto: CreateObjectDto,
    parsedFile: Record<string, any>[],
    commonFileInfo,
  ): Promise<CreateObjectResponse> {
    const { id, name, description } = createObjectDto;
    const { fileName, fileMimeType, fileExt } = commonFileInfo;

    const newObject = this.create({
      id: id || uuid.v4(),
      name,
      description,
      content: parsedFile,
    });

    const objectMetadata: IObjectMetadata = {
      ...commonFileInfo,
      s3Key: `${this.dataClassificationUuid}/${newObject.id}/${this.userUuid}-${fileName}-${formatString(
        fileMimeType,
      )}.${fileExt}`,
    };

    const objectToSave: IObjectToSave = Object.assign(newObject, {
      metadata: objectMetadata,
    });

    const savedObject = await this.save(objectToSave);

    return pick(savedObject, ['id', 'name', 'description', 'metadata', 'createdAt', 'updatedAt']);
  }

  async getAllObjects(page: number, pageSize: number) {
    const skip = getSkipParameter(page, pageSize);
    return this.findAndCount({
      skip,
      take: pageSize,
    });
  }

  async getObject(id: string): Promise<ObjectEntity> {
    return this.findOne(id);
  }

  async patchUpdateObject(id: string, updateObjectDto: UpdateObjectDto): Promise<ObjectEntity> {
    const updateResult = await this.update(id, {
      ...updateObjectDto,
      updatedAt: new Date(),
    });

    if (updateResult.affected) {
      return this.getObject(id);
    }
  }

  async putUpdateObject(id: string, updateObjectDto: UpdateObjectDto): Promise<ObjectEntity> {
    const foundObject = await this.getObject(id);
    if (foundObject) {
      const objectToUpdate = Object.assign(foundObject, updateObjectDto);
      return this.save(objectToUpdate);
    }
  }

  async deleteObject(id: string): Promise<Partial<ObjectEntity>> {
    const foundObject = await this.getObject(id);
    if (foundObject) {
      const deletedObject = await this.remove(foundObject);
      return { ...deletedObject, id };
    }
  }

  async getObjectContent(id: string, page: number, pageSize: number): Promise<GetObjectContentResponse> {
    const skip = getSkipParameter(page, pageSize);

    const qb = this.createQueryBuilder('object');

    const contentLength = await qb
      .select('jsonb_array_length(content)', 'total_content_items')
      .where('object.id = :id', { id })
      .execute();

    const contentData = await qb
      .select('json_agg("data")', 'content_items')
      .from(
        (subQuery) =>
          subQuery
            .select('jsonb_array_elements(content)', 'data')
            .from(ObjectEntity, 'object')
            .skip(skip)
            .take(pageSize)
            .where('object.id = :id', { id }),
        'result',
      )
      .execute();

    return {
      page,
      pageSize,
      id,
      total_content_items: contentLength[0]?.total_content_items,
      content_items: contentData[0]?.content_items || [],
    };
  }
}
