import { ObjectEntity } from '@app/common/db/entities';

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

const stubObjectsList = [stubObject, stubObject];

const paginationQueryParams = {
  page: 1,
  pageSize: 2,
};

const stubGetAllObjects = {
  total: 2,
  page: 1,
  pageSize: 2,
  data: stubObjectsList,
};

export {
  stubObject,
  stubObjectsList,
  stubPatchUpdateObject,
  stubGetAllObjects,
  stubPutUpdateObject,
  paginationQueryParams,
};
