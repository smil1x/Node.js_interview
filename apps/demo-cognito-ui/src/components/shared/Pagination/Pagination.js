import Select from 'react-select';

import { ArrowLeftSvgIcon, ArrowRightSvgIcon } from '../../../assets';

import Styles from './Pagination.module.scss';

const Pagination = ({
  selectRowsPerPageRef,
  rowsPerPageOptions,
  handleRowsPerPageChange,
  handleNextPage,
  pageSize,
  paginationSelectCustomStyles,
  components,
  page,
  rowCount,
  handlePrevPage,
  totalPages,
}) => {
  console.log({ totalPages });
  return (
    <div className={Styles.pagination}>
      <p className={Styles.text}>Rows per page</p>
      <Select
        ref={selectRowsPerPageRef}
        options={rowsPerPageOptions}
        onChange={handleRowsPerPageChange}
        className={Styles.pagination_select}
        placeholder={pageSize}
        styles={paginationSelectCustomStyles}
        components={{ ...components }}
      />
      <p className={Styles.text}>
        {page === 1 ? page : page * pageSize < rowCount ? pageSize * page : rowCount}-
        {pageSize * page < rowCount ? pageSize * page : rowCount} of{' '}
        {pageSize * page < rowCount ? pageSize * page : rowCount}
      </p>
      <button onClick={handlePrevPage} disabled={page === 1} className={Styles.arrow_btn}>
        <ArrowLeftSvgIcon />
      </button>
      <span className={Styles.text}>{page}</span>
      <button disabled={totalPages === page} onClick={handleNextPage} className={Styles.arrow_btn}>
        <ArrowRightSvgIcon />
      </button>
    </div>
  );
};

export default Pagination;
