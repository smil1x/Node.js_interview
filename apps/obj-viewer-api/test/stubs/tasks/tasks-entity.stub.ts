import { stubObject } from '@app/common/test-utils/stubs';

const stubTasksPayload = {
  objectId: stubObject.id,
  parameters: ['name', 'age'],
  serviceConfigTemplate: {
    url: 'example.com',
    method: 'POST',
    params: {
      id: { value: 'name', type: 'mapping' },
    },
    data: {
      myName: { value: 'name', type: 'mapping' },
      age: { value: 'age', type: 'mapping' },
      commonData: 123,
    },
  },
  serviceName: 'externalId',
};

const stubTasksSuccess = {
  success: [
    { externalResponse: 'Smallville', contentId: 1 },
    { externalResponse: 'Smallville', contentId: 2 },
  ],
  failed: [],
};

const stubFailedTasks = {
  success: [],
  failed: [
    {
      contentId: 1,
      message: 'Request failed with status code 404',
      isExternalServiceError: true,
    },
    {
      contentId: 2,
      message: 'Request failed with status code 404',
      isExternalServiceError: true,
    },
  ],
};

const stubTasksPartiallyFailed = {
  success: [{ externalResponse: 'Smallville', contentId: 1 }],
  failed: [
    {
      contentId: 2,
      message: 'Request failed with status code 404',
      isExternalServiceError: true,
    },
  ],
};

export { stubTasksPayload, stubTasksSuccess, stubFailedTasks, stubTasksPartiallyFailed };
