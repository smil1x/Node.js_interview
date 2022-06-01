import { DATA_CLASSIFICATION_NAMESPACE, DEFAULT_PAGE_NUMBER, USER_NAMESPACE, DATA_CLASS } from '../constants';
import * as uuid from 'uuid';
import { getExtensionFromName } from '@app/common/utils';

export const getSkipParameter = (page: number, pageSize: number): number => {
  return (page - DEFAULT_PAGE_NUMBER) * pageSize;
};

export const generateUserUUIDdDataUUID = (userId: string) => ({
  userUUID: uuid.v5(userId, USER_NAMESPACE),
  dataUUID: uuid.v5(DATA_CLASS, DATA_CLASSIFICATION_NAMESPACE),
});

export const generateS3Key = (objId: string, userId: string, fileName) => {
  const { userUUID, dataUUID } = generateUserUUIDdDataUUID(userId);
  return `${dataUUID}/${objId}/${userUUID}-${fileName}`;
};

export const generateFilesMetadata = (files, objId: string, userId: string, bucketName: string) => {
  return files.map((file) => {
    return {
      s3Key: generateS3Key(objId, userId, file.originalname || file),
      bucketName,
      fileName: file.originalname || file,
      fileExt: getExtensionFromName(file.originalname || file),
    };
  });
};

export const composeResponse = (files, metadata: Record<string, any>[], fileOperation: string) => {
  return files.map((item, idx) => {
    if (item.hasOwnProperty(metadata[idx].fileName)) {
      return { ...metadata[idx], [`${fileOperation}`]: item[metadata[idx].fileName] };
    }
  });
};
