import React, { useCallback } from 'react';

import styles from './Switcher.module.scss';

const Switcher = ({ title, defaultValue, onChange }: any) => {
  const handleChange = useCallback((event) => {
    const { checked } = event.target;

    onChange(checked);
  }, []);

  return (
    <>
      <input className={styles.checkbox} id={title} type="checkbox" onChange={handleChange} checked={defaultValue} />
      <label className={styles.switch} htmlFor={title} />
    </>
  );
};

export default Switcher;
