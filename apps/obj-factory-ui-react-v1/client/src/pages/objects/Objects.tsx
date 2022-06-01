import ObjectsList from '../../components/objectsList/ObjectsList';
import { SelectComponent as PageSizeSelect } from '../../shared/select/Select';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useGetObjectsQuery } from '../../services/objects';
import { switchViewType } from '../../features/objects/listViewSlice';
import { setPage, setPageSize } from '../../features/objects/objectsPaginationSlice';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import { ViewTypes } from '../../constants/viewType';
import { ViewTypesToggler } from '../../shared/toggler/Toggler';
import { DEFAULT_PAGE } from '../../constants/pageQueryParams';

import Pagination from '@material-ui/lab/Pagination';
import { DEFAULT_SELECT_ITEMS, DEFAULT_TOGGLE_ITEMS } from '../../constants/defaultParams';

const useStyles = makeStyles((theme) =>
  createStyles({
    controls: {
      width: '100%',
      height: '3rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '1rem',
      padding: '3rem 0',
    },
    pagination: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),
);

const ObjectsPage = () => {
  const dispatch = useAppDispatch();
  const { viewType, page, pageSize } = useAppSelector(
    ({ viewType: { viewType }, objectsPagination: { page, pageSize } }) => ({ viewType, page, pageSize }),
  );
  const { data, error, isLoading, isFetching } = useGetObjectsQuery({ page, pageSize });
  const { controls, pagination } = useStyles();

  const getTotalPages = (total: number, pageSize: number) => Math.ceil(total / pageSize);

  const handleChangePageSize = (size: number) => {
    dispatch(setPageSize(size));
    dispatch(setPage(DEFAULT_PAGE));
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => dispatch(setPage(page));

  const viewTypesTogglerHandler = (value: ViewTypes) => {
    dispatch(switchViewType(value));
  };

  const loaderJsx = isLoading && <CircularProgress />;

  const errorJsx = !isLoading && error && <h1>Error...</h1>;

  const objectsJsx =
    !isLoading &&
    !error &&
    (data && data.data.length !== 0 ? (
      <>
        <div className={controls}>
          <Pagination
            count={getTotalPages(data.total, data.pageSize)}
            color="primary"
            onChange={handlePageChange}
            siblingCount={0}
            boundaryCount={2}
            className={pagination}
          />
          <PageSizeSelect
            label="per page"
            onChange={handleChangePageSize}
            value={pageSize}
            items={DEFAULT_SELECT_ITEMS}
          />
          <ViewTypesToggler onChange={viewTypesTogglerHandler} items={DEFAULT_TOGGLE_ITEMS} />
        </div>
        {isFetching && !isLoading ? <CircularProgress /> : <ObjectsList objectsList={data.data} viewType={viewType} />}
      </>
    ) : (
      <h2>No Items</h2>
    ));

  return (
    <>
      {loaderJsx}
      {errorJsx}
      {objectsJsx}
    </>
  );
};

export default ObjectsPage;
