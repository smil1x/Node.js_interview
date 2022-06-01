import React from 'react';
import styles from './Popup.module.scss';

const Popup = ({ children, close }: any) => {
  return (
    <div className={styles.popup}>
      <div className={styles.popup_inner}>
        <div className={styles.close} onClick={close}></div>
        {children}
      </div>
    </div>
  );
};

export default Popup;
