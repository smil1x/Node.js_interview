import React from 'react';
import styles from './Spinner.module.scss';

const Spinner = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader}> Loading...</div>
    </div>
  );
};

export default Spinner;
