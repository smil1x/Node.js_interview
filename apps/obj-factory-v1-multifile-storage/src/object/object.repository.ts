import { EntityRepository, Repository } from 'typeorm';
import { ObjectEntity } from './object.entity';
import { GetAllFilesResponse, DeleteFileResponse } from './dto';
import { getSkipParameter } from '../core/utils';
import { findUploadedFileRowQuery } from './sql';
import { firstSaveFilesMetadataQuery, mergeOrAddFilesMetadataQuery } from '@app/common/db/queries';

@EntityRepository(ObjectEntity)
export class ObjectRepository extends Repository<ObjectEntity> {
  async updateObjectMetadata(id: string, filesMetadata: Record<string, any>[]) {
    const queryBuilder = this.createQueryBuilder('object');
    const totalUploadedFiles = await this.getFilesMetadataLength(id, queryBuilder);

    return queryBuilder
      .update()
      .set({
        updatedBy: () => "current_setting('current.userId')",
        updatedAt: () => 'current_timestamp(0)',
        metadata: () =>
          !totalUploadedFiles
            ? firstSaveFilesMetadataQuery(filesMetadata)
            : mergeOrAddFilesMetadataQuery(filesMetadata, id),
      })
      .where(`"objectId" = :id`, { id })
      .execute();
  }

  async getFilesMetadataLength(id: string, queryBuilder): Promise<number> {
    const [{ totalUploadedFiles }] = await queryBuilder
      .select(`jsonb_array_length(metadata ->'object_uploaded_files')`, 'totalUploadedFiles')
      .where(`"objectId" = :id`, { id })
      .execute();

    return totalUploadedFiles;
  }

  async getAllFiles(id: string, page: number, pageSize: number): Promise<Partial<GetAllFilesResponse>> {
    const skip = getSkipParameter(page, pageSize);
    const queryBuilder = this.createQueryBuilder('object');

    const totalUploadedFiles = await this.getFilesMetadataLength(id, queryBuilder);

    const retrievedFiles = await queryBuilder
      .select('json_agg("data")', 'files')
      .from(
        (subQuery) =>
          subQuery
            .select(`jsonb_array_elements(metadata->'object_uploaded_files')`, 'data')
            .from(ObjectEntity, 'object')
            .skip(skip)
            .take(pageSize)
            .where('object.id = :id', { id }),
        'result',
      )
      .execute();

    return {
      totalUploadedFiles,
      retrievedFiles: retrievedFiles[0]?.files || [],
    };
  }

  async getFileMetadataRow(params: any[]) {
    return this.query(findUploadedFileRowQuery, params);
  }

  async deleteFile(
    id: string,
    fileName: string,
    userId: string,
    fileRow: Record<string, any>,
    fileRowNumber: number,
  ): Promise<DeleteFileResponse> {
    await this.createQueryBuilder('object')
      .update()
      .set({
        updatedBy: () => "current_setting('current.userId')",
        updatedAt: () => 'current_timestamp(0)',
        metadata: () =>
          `jsonb_set(metadata, array['object_uploaded_files'], (metadata->'object_uploaded_files')::jsonb - ${
            Number(fileRowNumber) - 1
          })`,
      })
      .where('"objectId" = :id', { id })
      .execute();

    return {
      id,
      deletedFileMetadata: fileRow,
    };
  }
}
