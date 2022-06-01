import React from 'react';
import styles from './Button.module.scss';

const Button = ({ children, onClick, disabled, color }: any) => {
  const buttonClass = styles[color];

  return (
    <button className={buttonClass} disabled={disabled} onClick={onClick} type="button">
      {children}
    </button>
  );
};

export default Button;
