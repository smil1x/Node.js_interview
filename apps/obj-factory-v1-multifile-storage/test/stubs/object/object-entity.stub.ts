import { ObjectEntity } from '../../../src/object/object.entity';

const testUserId = '3004cab2-8a52-404e-be56-49c2656a7f77';

const stubObject = new ObjectEntity({
  id: '2b09099d-ce79-42c0-9ac9-8a53452e57f3',
  name: 'test name',
  description: 'test description',
});

const stubPutUpdateObject = new ObjectEntity({
  id: '2b09099d-ce79-42c0-9ac9-8a53452e57f3',
  name: 'new name',
  description: 'new description',
});

const stubPatchUpdateObject = new ObjectEntity({ ...stubObject, description: 'new description' });

const stubGetFileMetadataRow = [
  {
    row: {
      bucketName: 'testBucketName',
      fileExt: 'png',
      fileName: 'test.png',
      s3Key:
        '113f8b82-0920-5ede-a897-788f7c1929b1/2b09099d-ce79-42c0-9ac9-8a53452e57f3/f2223ce2-c0a5-54c5-8fc1-fd75a70c32db-test.png',
    },
    rowNumber: 1,
  },
];

const stubPresignedUrlUploadedFilesMetadata = {
  id: '2b09099d-ce79-42c0-9ac9-8a53452e57f3',
  filesMetadataAndPresignedUrl: [{ ...stubGetFileMetadataRow[0].row, presignedUrl: 'test url' }],
};

const stubS3UploadedFilesMetadata = {
  id: '2b09099d-ce79-42c0-9ac9-8a53452e57f3',
  filesMetadata: [{ ...stubGetFileMetadataRow[0].row, uploadToS3Bucket: 'Successfully uploaded.' }],
};

const stubUploadedFile = {
  destination: '',
  filename: '',
  path: '',
  stream: undefined,
  fieldname: 'files',
  originalname: 'test.png',
  encoding: '7bit',
  buffer: Buffer.from(''),
  mimetype: 'image/png',
  size: 29118,
};

const stubGetAllFiles = {
  totalUploadedFiles: 1,
  retrievedFiles: [stubGetFileMetadataRow[0].row],
};

export {
  stubObject,
  testUserId,
  stubPatchUpdateObject,
  stubPutUpdateObject,
  stubPresignedUrlUploadedFilesMetadata,
  stubS3UploadedFilesMetadata,
  stubUploadedFile,
  stubGetFileMetadataRow,
  stubGetAllFiles,
};
