import React, { useRef, useCallback } from 'react';
import { getGroups } from '../../utils';
import { Table } from '../shared';
import protectedRoute from '../../protectedRoute';
import { IDatasource, IGetRowsParams } from 'ag-grid-community/dist/lib/interfaces/iDatasource';
import GroupTableNavigation from './components/GroupTableNavigation';
import { GridApi } from 'ag-grid-community/dist/lib/gridApi';
import { AgGridEvent } from 'ag-grid-community/dist/lib/events';

const getDataSource = ({ Limit = 5 }: { Limit?: number}): IDatasource => {
  return {
    rowCount: undefined,
    getRows: (params : IGetRowsParams) => {
      (async () => {
        const { groups } = await getGroups(Limit);
        params.successCallback(groups, null);
      })();
    },
  };
};

const columnDefs = [
  { field: 'groupName' },
  { field: 'userPoolId' },
  { field: 'description' },
  { field: 'roleArn' },
  { field: 'precedence' },
]

const GroupManagementTable = () => {
  const gridRef = useRef();

  const onGridReady = useCallback(
    (gridEvent: AgGridEvent) => {
      const dataSource: IDatasource = getDataSource({});
      gridEvent.api.setDatasource(dataSource);
      gridEvent.api.sizeColumnsToFit();
      gridRef.current = gridEvent.api as any;
    },
    [],
  );

  const handleRefreshTable = () => {
    const dataSource = getDataSource({});
    (gridRef.current as GridApi).setDatasource(dataSource);
  };

  return (
    <>
      <GroupTableNavigation handleRefreshTable={handleRefreshTable}/>
      <div className="ag-theme-alpine" style={{ height: 300, width: '100%' }}>
        <Table gridRef={gridRef} onGridReady={onGridReady} columnDefs={columnDefs} />
      </div>
    </>
  );
};

export default protectedRoute(GroupManagementTable);
