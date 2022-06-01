export const mockS3Service = {
  upload: jest.fn().mockImplementation(() => Promise.resolve()),
  getObject: jest.fn().mockImplementation(() => Promise.resolve()),
  putObject: jest.fn().mockImplementation(() => Promise.resolve()),
  deleteObject: jest.fn().mockImplementation(() => Promise.resolve()),
  getSignedUrlPromise: jest.fn(),
  getS3Client: jest.fn(),
  getPresignedUrlIfExists: jest.fn(),
  fileExistsInBucket: jest.fn(),
};
