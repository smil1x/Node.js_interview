## obj-factory-v1-multifile-storage TODO list

### Done
- [x] Implement /api/v1/objects/, POST endpoint (include metadata field - accepts any JSON object)
- [x] Implement /api/objects/{objectId}/files, POST:
  - files (any format)
  - accepts two uploading strategies:
    1. proxying uploading to S3 through server 
    2. directly uploading to S3 (presigned URL)
  
- [x] Implement /api/objects/{objectId}/files, GET
- [x] Implement /api/objects/{objectId}/files/{fileName}, GET
- [x] Implement /api/objects/{objectId}/files/{fileId}, DELETE

- [x] Make S3Service more universal: S3Service should provide three ways to use AWS S3 methods: 
  1) the user can get the native AWS S3 client via getNative method od S3Service class
  2) the user can call the method defined on S3Service class 
  3) the user can call a method defined only in the native AWS S3 client

- [x] Tests
- [x] Add auth lib
- 
### Todo
- [ ] Implement AWS Lambda function, that will listen S3 events and update object metadata field with files metadata