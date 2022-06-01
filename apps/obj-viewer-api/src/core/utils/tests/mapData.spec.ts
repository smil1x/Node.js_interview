import { mapData } from '../index';

const baseResult = {
  serviceId: 1,
  userName: 'Alex',
};

const baseTemplate = {
  serviceId: {
    type: 'mapping',
    value: 'id',
  },
  userName: {
    type: 'MAPPING',
    value: 'name',
  },
};

const baseDataset = { id: 1, name: 'Alex' };

describe('mapData', () => {
  it('should return null', () => {
    expect(mapData(undefined, { id: 1, name: 'Alex' })).toEqual(null);
    expect(mapData(null, { id: 1, name: 'Alex' })).toEqual(null);
  });

  it('should return mapped object', () => {
    expect(mapData(baseTemplate, baseDataset)).toEqual(baseResult);
  });

  it('should return mapped object with props that does not exist in dataset', () => {
    const expectedResult = {
      ...baseResult,
      car: { type: 'mapping', value: 'myCar' },
    };

    const extendedTemplate = {
      ...baseTemplate,
      car: { type: 'mapping', value: 'myCar' },
    };
    expect(mapData(extendedTemplate, baseDataset)).toEqual(expectedResult);
  });
});
