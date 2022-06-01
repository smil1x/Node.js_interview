import { EntityManager, EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import * as uuid from 'uuid';
import { pick } from 'lodash';
import { ObjectEntity } from '@app/common/db/entities';
import { IObjectToSave, IObjectMetadata } from './object.interface';
import {
  CreateObjectDto,
  UpdateObjectDto,
  UpdateContentDto,
  FieldsKeyValue,
  CreateObjectResponse,
  GetObjectContentResponse,
  DeleteObjectContentRowResponse,
} from './dto';
import { DATA_CLASSIFICATION_NAMESPACE, USER_NAMESPACE } from '../core/constants';
import { findContentRowQuery, updateContentQuery } from './sql';
import { getSkipParameter } from '../core/utils';
import { formatString } from '@app/common/utils';
import { TransactionWrapper } from '@app/common/decorators';

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
      updatedAt: () => 'CURRENT_TIMESTAMP(0)',
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
    const queryBuilder = this.createQueryBuilder('object');

    const totalContentRows = await this.getContentLength(id, queryBuilder);

    const contentData = await queryBuilder
      .select('json_agg("data")', 'contentRows')
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
      totalContentRows,
      contentRows: contentData[0]?.contentRows || [],
    };
  }

  async findContentRow(findContentRowQueryParams) {
    return this.query(findContentRowQuery, findContentRowQueryParams);
  }

  async getContentProps(objId, params, contentColumnName) {
    const selSrt = this.selectContentColumns(params, contentColumnName);
    return this.createQueryBuilder('object').select(selSrt).where('object.id = :objId', { objId }).execute();
  }

  private selectContentColumns(columns: string[], contentColumnName: string): string {
    return columns.reduce((acc, prop) => {
      const pattern = `jsonb_array_elements(content) -> '${prop}' as "${prop}"`;
      return `${acc},  ${pattern}`;
    }, `jsonb_array_elements(content) -> '${contentColumnName}' as "contentId"`);
  }

  async getContentColumnName(objId: string): Promise<string> {
    const [{ fileName }] = await this.createQueryBuilder('object')
      .select(`metadata -> 'fileName'`, 'fileName')
      .where('object.id = :objId', { objId })
      .execute();

    return `${fileName}_contentId`;
  }

  async getContentLength(id: string, queryBuilder: SelectQueryBuilder<ObjectEntity>): Promise<number> {
    const [{ totalContentRows }] = await queryBuilder
      .select('jsonb_array_length(content)', 'totalContentRows')
      .where('object.id = :id', { id })
      .execute();

    return totalContentRows;
  }

  async checkParametersInContentSchema(objId: string, parameters: string[]): Promise<boolean> {
    const [{ areFieldsFound }] = await this.createQueryBuilder('object')
      .select(`metadata->'schema' ?& array${JSON.stringify(parameters).replace(/"/g, "'")}`, 'areFieldsFound')
      .where('object.id = :objId', { objId })
      .execute();

    return areFieldsFound;
  }

  async emptyContentSchema(id: string, queryBuilder: SelectQueryBuilder<ObjectEntity>) {
    return queryBuilder
      .update()
      .set({ metadata: () => `jsonb_set(metadata, '{schema}', '[]', false)` })
      .where(`"objectId" = :id`, { id })
      .execute();
  }

  async updateFieldValue(updateContentQueryParams) {
    const [[{ updatedValue }]] = await this.query(updateContentQuery, updateContentQueryParams);
    return updatedValue;
  }

  @TransactionWrapper
  async updateFields(
    fields: UpdateContentDto['fields'],
    id: string,
    contentId: number,
    fileName: string,
    entityManager: EntityManager = null,
  ): Promise<FieldsKeyValue[]> {
    const customRepository = entityManager.getCustomRepository(ObjectRepository);

    return Promise.all(
      fields.map(async ({ key, value }) => {
        const updateContentQueryParams = [id, `${JSON.stringify(value)}`, contentId, key, fileName];

        const updatedValue = await customRepository.updateFieldValue(updateContentQueryParams);

        return { key, value: updatedValue };
      }),
    );
  }

  @TransactionWrapper
  async deleteContentRow(
    id: string,
    contentId: string,
    foundRow: Record<string, any>,
    entityManager: EntityManager = null,
  ): Promise<DeleteObjectContentRowResponse> {
    const queryBuilder = entityManager.getCustomRepository(ObjectRepository).createQueryBuilder('object');

    const { rowNumber, row } = foundRow;

    const deleteContentItem = await queryBuilder
      .update()
      .set({
        updatedAt: () => 'CURRENT_TIMESTAMP(0)',
        content: () => `content - ${Number(rowNumber) - 1}`,
      })
      .where('"objectId" = :id', { id })
      .execute();

    const totalContentRows = await this.getContentLength(id, queryBuilder);
    if (totalContentRows === 0) {
      await this.emptyContentSchema(id, queryBuilder);
    }

    if (deleteContentItem.affected > 0) {
      return {
        id,
        totalContentRows,
        deletedRow: row,
        message: `Object content row with contentId: ${contentId} was deleted`,
      };
    }
  }

  async expandContentSchema(newColumn: string, objId: string) {
    return this.createQueryBuilder('object')
      .update('object')
      .set({ metadata: () => `jsonb_insert(metadata, '{schema, 0}', '"${newColumn}"', false )` })
      .where(`"objectId" = :objId`, { objId })
      .andWhere(`NOT metadata->'schema' @> '"${newColumn}"'`)
      .execute();
  }
}
