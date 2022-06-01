import React from 'react';
import styles from './Checkbox.module.scss';

const Checkbox = ({ isChecked, name, value, onChange, label, disabled }: any) => {
  return (
    <label
      className={styles.container}
      onClick={(e) => {
        e.preventDefault();
        onChange(disabled ? isChecked : !isChecked);
      }}
    >
      <input type="checkbox" checked={isChecked} name={name} disabled={disabled} onChange={() => null} value={value} />
      <span className={styles.checkmark}></span>
      <p className={styles.label}>{label}</p>
    </label>
  );
};

export default Checkbox;
