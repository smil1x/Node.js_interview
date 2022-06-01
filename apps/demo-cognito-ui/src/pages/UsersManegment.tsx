import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import GroupManagementTable from '../components/GroupManagementTable/GroupManagementTable';
import UsersManagementTable from '../components/UserManagementTable/UsersManagemetnTable';
import styles from './UsersManagement.module.scss';

const UsersManagement = () => {
  const [activeTab, setActiveTab] = useState('Users');

  const handleTabs = (tabTitle: string) => () => {
    setActiveTab(tabTitle);
  };

  const tabComponents = {
    Users: <UsersManagementTable />,
    Groups: <GroupManagementTable />,
  };

  return (
    <>
      <div>
        <div className={styles.tabs}>
          <button className={activeTab === 'Users' ? styles.tab_active : styles.tab} onClick={handleTabs('Users')}>
            Users
          </button>
          <button className={activeTab === 'Groups' ? styles.tab_active : styles.tab} onClick={handleTabs('Groups')}>
            Groups
          </button>
        </div>
        <h2 className={styles.title}>{activeTab}</h2>
        <div>{tabComponents[activeTab]}</div>
      </div>
      <Outlet/>
    </>
  );
};

export default UsersManagement;
