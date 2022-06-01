import React from 'react';
import { components } from 'react-select';
import styles from './Dropdown.module.scss';
import { Switcher } from '../index';

const Menu = (props: any) => {
  const {
    children,
    selectProps: { changeOptionsData, isShowSelected, deselectAll },
  } = props;

  return (
    <components.Menu {...props}>
      {children}
      <div className={styles.container}>
        <div className={styles.switcherContainer}>
          <Switcher title="showOnlySelected" onChange={changeOptionsData} defaultValue={isShowSelected} />
          <label htmlFor="showOnlySelected" className={styles.title}>
            Show only selected
          </label>
        </div>
        <button className={styles.clearAllBtn} onClick={deselectAll}>
          clear all
        </button>
      </div>
    </components.Menu>
  );
};

export default Menu;
