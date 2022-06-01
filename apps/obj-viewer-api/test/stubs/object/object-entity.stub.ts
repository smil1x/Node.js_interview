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

const stubUpdateContentResult = [{ key: 'sites', value: 'Smallville' }];

const stubGetObjectContent = {
  page: 1,
  pageSize: 2,
  id: '2b09099d-ce79-42c0-9ac9-8a53452e57f3',
  totalContentRows: 2,
  contentRows: [
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

const stubGetContentColumnName = 'File';

const stubFindContentRow = [
  {
    rowNumber: '1',
    row: {
      name: 'test name',
      surName: 'test surname',
      contentId: 1,
    },
  },
];

const stubGetContentProps = [
  { name: 'Alex', age: 25, contentId: 1 },
  { name: 'Bob', age: 18, contentId: 2 },
];

const stubDeleteObjectContentRow = {
  id: '2b09099d-ce79-42c0-9ac9-8a53452e57f3',
  totalContentRows: 1,
  deletedRow: {
    name: 'test name',
    surName: 'test surname',
    contentId: 1,
  },
  message: `Object content row with contentId: 1 was deleted`,
};

export {
  stubCreateObjectResponse,
  stubUploadedFile,
  stubGetObjectContent,
  stubUpdateContentResult,
  stubGetContentColumnName,
  stubFindContentRow,
  stubGetContentProps,
  stubDeleteObjectContentRow,
};
