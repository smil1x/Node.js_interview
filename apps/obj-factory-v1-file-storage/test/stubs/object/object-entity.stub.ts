const stubUploadedFile = {
  destination: '',
  filename: '',
  path: '',
  stream: undefined,
  fieldname: 'file',
  originalname: 'test.xlsx',
  encoding: '7bit',
  mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  buffer: Buffer.from('Name\tSur name\n' + 'Test name\tTest surname\n'),
  size: 10253,
};

const stubCreateObjectResponse = {
  id: '2b09099d-ce79-42c0-9ac9-8a53452e57f3',
  name: 'test object',
  description: 'test description',
  metadata: {
    fileName: 'test_object',
    fileMimeType: 'application_vnd_openxmlformats_officedocument_spreadsheetml_sheet',
    fileExt: 'xlsx',
    schema: ['name', 'surName'],
    s3Key:
      'c1854868-90fe-50c6-a2cd-7e49ad7eddba/2b09099d-ce79-42c0-9ac9-8a53452e57f3/b74006f8-eab5-5193-9f51-7589fa9b5486-test_object-application_vnd_openxmlformats_officedocument_spreadsheetml_sheet.xlsx',
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};

const stubGetObjectContent = {
  page: 1,
  pageSize: 2,
  id: '2b09099d-ce79-42c0-9ac9-8a53452e57f3',
  total_content_items: 2,
  content_items: [
    {
      name: 'test name',
      surName: 'test surname',
      contentId: 1,
    },
    {
      name: 'test name',
      surName: 'test surname',
      contentId: 2,
    },
  ],
};

export { stubCreateObjectResponse, stubUploadedFile, stubGetObjectContent };
