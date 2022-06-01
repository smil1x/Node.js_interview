import React, { LegacyRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Styles from './Table.module.scss';
import { ColumnApi } from 'ag-grid-community/dist/lib/columns/columnApi';

type TableProps = {
  gridRef: LegacyRef<AgGridReact>,
  onGridReady: any,
  defaultColDef?: typeof initDefaultColDef,
  columnDefs: any,
  pageSize?: number,
  columnApi?: ColumnApi
}


const initDefaultColDef = {
  resizable: true,
  filter: true,
  sortable: true,
  headerCheckboxSelection: false,
  headerClass: Styles.header,
  cellClass: Styles.cell,
  flex: 1,
};

const Table: React.FC<TableProps> = ({ gridRef, onGridReady, defaultColDef = initDefaultColDef, columnDefs, pageSize= 5, columnApi }) => {
  return (
    <AgGridReact
      ref={gridRef}
      onGridReady={onGridReady}
      rowClass={Styles.row}
      defaultColDef={defaultColDef}
      columnDefs={columnDefs}
      pagination={true}
      paginationPageSize={pageSize}
      headerHeight={56}
      rowModelType={'infinite'}
      cacheBlockSize={50}
      suppressPaginationPanel={true}
      onGridColumnsChanged={() => {
        columnApi && columnApi.autoSizeAllColumns();
      }}
    />
  );
};

export default Table;
