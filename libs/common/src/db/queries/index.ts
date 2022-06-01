import { uniqBy } from 'lodash';

export const setSessionUserQuery = (userId?: string): string => `SET "current.userId" = '${userId || 'system'}'`;

export const firstSaveFilesMetadataQuery = (filesMetadata: Record<string, any> | Record<string, any>[]) =>
  Array.isArray(filesMetadata)
    ? `jsonb_set(coalesce(metadata, '{}'), '{object_uploaded_files}', '${JSON.stringify(
        uniqBy(filesMetadata, 's3Key'),
      )}'::jsonb )`
    : `jsonb_set(coalesce(metadata, '{}'), '{object_uploaded_files}', '[${JSON.stringify(filesMetadata)}]'::jsonb)`;

export const mergeOrAddFilesMetadataQuery = (filesMetadata: Record<any, any>[], objectId: string) =>
  `jsonb_set(metadata, '{object_uploaded_files}', (
    SELECT json_agg(mergedJSONB)::jsonb
    FROM (
      SELECT json_object_agg(key, value)::jsonb AS mergedJSONB
        FROM (
          SELECT file ->> 's3Key' AS s3Key, item.* FROM jsonb_array_elements(metadata -> 'object_uploaded_files') file, jsonb_each(file) item
          WHERE "objectId" = '${objectId}'
          UNION ALL
          SELECT file ->> 's3Key' AS s3Key, item.* FROM jsonb_array_elements('${JSON.stringify(
            filesMetadata,
          )}'::jsonb) file, jsonb_each(file) item
        ) t
      GROUP BY s3Key
    ) t)
  )`;
