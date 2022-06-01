import React, { useCallback } from 'react';
import { Button, Dropdown, TextInput } from '../../../shared';
import { useFormHook } from '../../../../hooks';

import styles from './UserTableNavigation.module.scss';
import { useNavigate } from 'react-router-dom';

const filtersOptions = [
  { value: 'username', label: 'User Name' },
  { value: 'email', label: 'Email' },
  { value: 'cognito:user_status', label: 'Status' },
];

const UserTableNavigation = ({ handleSearch, handleRefresh }: any) => {
  const {
    formState: searchState,
    updateForm: updateSearchState,
    resetFormState: resetSearchState,
  } = useFormHook({ selectedFilter: '', value: '' });
  const navigate = useNavigate();

  const handleSearchInputChange = useCallback(
    (inputValue) => {
      updateSearchState('value', inputValue);
      handleSearch(searchState.selectedFilter, inputValue);
    },
    [searchState.value, searchState.selectedFilter],
  );

  const refresh = () => {
    resetSearchState();
    handleRefresh();
  };

  return (
    <>
      <div className={styles.search}>
        <Dropdown
          options={filtersOptions}
          placeholder="Category"
          onChange={(value: any) => {
            updateSearchState('selectedFilter', value);
          }}
          selectedValue={Array(filtersOptions.find((item) => item.value === searchState.selectedFilter))}
          movePlaceholder={false}
        />
        <TextInput
          disabled={!searchState.selectedFilter}
          type="search"
          value={searchState.value}
          onChange={handleSearchInputChange}
          placeholder="Search for value"
        />
      </div>
      <div className={styles.bar}>
        <div className={styles.buttons}>
          <Button onClick={refresh} color="primary">
            refresh
          </Button>
          <button className={styles.btn}>import users</button>
          <button className={styles.btn} onClick={() => navigate('createuser')}>
            create user
          </button>
        </div>
      </div>
    </>
  );
};

export default UserTableNavigation;
