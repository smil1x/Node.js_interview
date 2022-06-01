import { getUsers } from '../';

export const setOnGridReady =
  ({
    dataSourceParams: { Filter = '', Limit = 50, rowCount = undefined, setPaginationToken = () => {} },
    gridRef,
    columnGridRef,
    cb,
  }) =>
  ({ api, columnApi }) => {
    gridRef.current = api;
    columnGridRef.current = columnApi;

    const dataSource = getDataSource({ Filter, Limit, rowCount, setPaginationToken });
    api.setDatasource(dataSource);
    console.log({ cb });
    cb();
  };

export const getDataSource = ({ Filter = '', setPaginationToken = () => {}, Limit = 5, rowCount = undefined }) => {
  let paginationToken = undefined;
  console.log({ fnRow: rowCount });
  return {
    rowCount,
    getRows: function (params) {
      console.log('asking for ' + params.startRow + ' to ' + params.endRow, 'uuususussusus');
      (async () => {
        console.log({ Filter });
        const cognitoParams = { Limit, UserPoolId: 'us-east-2_DhIVEOnxj', Filter, PaginationToken: paginationToken };
        console.log({ paginationToken });
        const { users, PaginationToken } = await getUsers({ params: cognitoParams });
        paginationToken = PaginationToken;
        setPaginationToken(PaginationToken);
        console.log('first', users);
        console.log({ paaag: PaginationToken });
        params.successCallback(users, rowCount);
      })();
    },
  };
};
