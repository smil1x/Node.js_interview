import React, { useState, useRef, useCallback } from 'react';
import protectedRoute from '../../protectedRoute';
import { Table } from '../shared';
import { ArrowLeftSvgIcon, ArrowRightSvgIcon } from '../../assets';
import UserTableNavigation from './components/UserTableNavigation/UserTableNavigation';
import { PAGINATION_SELECT_CUSTOM_STYLES, ROWS_PER_PAGE_OPTIONS, USERS_TABLE_FIELDS } from '../../constants';
import SvgArrowDown from '../../assets/icons/arrow_down';
import Pagination from '../shared/Pagination/Pagination';
import { useGetUserPoolDescription } from '../../hooks';
import { getDataSource, setOnGridReady } from '../../utils/agGrid';
import SvgDeleteIcon from '../../assets/icons/delete_icon';
import { ActionAgGridCell, SelectAgGridCell } from '../AgGrid';
import { changeEnabledStatus, deleteUser } from '../../utils';

const addActionField = (handler: any) => {
  return {
    field: 'action',
    cellRenderer: ActionAgGridCell,
    cellRendererParams: {
      icon: <SvgDeleteIcon />,
      content: 'Delete',
      handler,
    },
  };
};

const addEnableField = (handler: any) => {
  return {
    field: 'Enabled',
    cellStyle: { overflow: 'visible', position: 'relative' },
    cellRenderer: SelectAgGridCell,
    cellRendererParams: {
      options: [
        { value: 'Enabled', label: 'Enabled' },
        { value: 'Disabled', label: 'Disabled' },
      ],
      handler,
    },
  };
};

const UsersManagementTable = () => {
  const { rowCount } = useGetUserPoolDescription();
  const [totalPages, setTotalPages] = useState(undefined);

  const [usersFilter, setUsersFilter] = useState('');

  const gridRef = useRef();
  const columnGridRef = useRef();
  const selectRowsPerPageRef = useRef();

  const [paginationToken, setPaginationToken] = useState('');
  const [columnDefs] = useState([
    ...USERS_TABLE_FIELDS,
    addActionField(async (data: any) => {
      try {
        await deleteUser(data.username);
        console.log({ username: data.username });
      } catch (e) {
        console.log({ e });
      }
    }),
    // addEnableField(async ({ value, data }) => {
    //   await changeEnabledStatus(value, data.username);
    //   console.log('updaaaate', gridRef.current.refreshCells);
    //   gridRef.current.refreshCells({ force: true });
    // }),
  ]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const dataSourceParams = { Filter: '', setPaginationToken, Limit: 50, rowCount };
  const setPageSizeAndTotalPages = () => {
    console.log({ rowCount, pageSize });
    console.log({ tooot: Math.ceil(rowCount / pageSize) });
    setTotalPages(Math.ceil(rowCount / pageSize));
  };

  const onGridReady = setOnGridReady({ dataSourceParams, gridRef, columnGridRef, cb: setPageSizeAndTotalPages } as any);

  const handleSearch = useCallback(
    (filterName, value) => {
      const filter = `${filterName}^="${value}"`;
      setUsersFilter(filter);
      setPage(1);
      // @ts-expect-error
      const dataSource = getDataSource({ Filter: filter, setPaginationToken, rowCount });
      // @ts-expect-error
      gridRef.current.setDatasource(dataSource);
    },
    [rowCount],
  );

  const handleRefreshTable = () => {
    setPageSize(5);
    setPage(1);
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    selectRowsPerPageRef.current.clearValue();
    // @ts-expect-error
    const dataSource = getDataSource({ Filter: usersFilter, setPaginationToken, rowCount });
    // @ts-expect-error
    gridRef.current.setDatasource(dataSource);
  };

  const handleRowsPerPageChange = (option: any) => {
    if (option) {
      const pageSize = option.value;
      setPageSize(pageSize);
      setTotalPages(Math.ceil(rowCount / pageSize));
      setPage(1);
      // @ts-expect-error
      gridRef.current.paginationSetPageSize(pageSize);
    }
  };

  const handleNextPage = () => {
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    const curPage = gridRef.current.paginationGetCurrentPage() + 1;
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    gridRef.current.paginationGoToNextPage();
    console.log({ curPage });
    setPage(curPage + 1);
  };

  const handlePrevPage = () => {
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    const curPage = gridRef.current.paginationGetCurrentPage() + 1;
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    gridRef.current.paginationGoToPreviousPage();
    console.log({ curPage });
    setPage(curPage - 1);
  };

  console.log({ gridRef });
  console.log({ paginationToken });

  return (
    <>
      <UserTableNavigation handleSearch={handleSearch} handleRefresh={handleRefreshTable} />
      {rowCount && (
        <div className="ag-theme-alpine" style={{ height: 300, width: '100%' }}>
          <Table
            gridRef={gridRef}
            columnApi={columnGridRef.current}
            onGridReady={onGridReady}
            columnDefs={columnDefs}
            pageSize={pageSize}
          />
          <Pagination
            rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
            handleRowsPerPageChange={handleRowsPerPageChange}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
            paginationSelectCustomStyles={PAGINATION_SELECT_CUSTOM_STYLES}
            components={{ DropdownIndicator: () => <SvgArrowDown style={{ marginRight: '19px' }} /> }}
            rowCount={rowCount}
            totalPages={totalPages}
            selectRowsPerPageRef={selectRowsPerPageRef}
            page={page}
            pageSize={pageSize}
          />
        </div>
      )}
    </>
  );
};

export default protectedRoute(UsersManagementTable);
