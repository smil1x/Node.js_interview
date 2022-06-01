import React, { useCallback, useState } from 'react';
import styles from './TextInput.module.scss';

const TextInput = ({ value, placeholder, disabled, onChange, type = 'text', info = {} }: any) => {
  const [inputType, changeInputType] = useState(type);

  const handleChange = useCallback(
    (event) => {
      const { value } = event.target;
      onChange(value);
    },
    [onChange],
  );

  const toggleVisibility = () => {
    inputType === 'text' ? changeInputType('password') : changeInputType('text');
  };

  const renderInfo = () => {
    return info.messages
      ? info.messages.map((msg: any, index: any) => {
          return (
            <p className={styles[info.level]} key={index}>
              {msg}
            </p>
          );
        })
      : null;
  };

  const inputStyles = info.level === 'error' ? styles.inputError : null;
  const placeholderStyles = `${styles.placeholder} ${info.level && styles[info.level]}`;

  return (
    <div className={styles.container}>
      {type === 'password' && (
        <svg
          className={styles.eye}
          onClick={toggleVisibility}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 5C7 5 2.73 8.11 1 12.5C2.73 16.89 7 20 12 20C17 20 21.27 16.89 23 12.5C21.27 8.11 17 5 12 5ZM12 17.5C9.24 17.5 7 15.26 7 12.5C7 9.74 9.24 7.5 12 7.5C14.76 7.5 17 9.74 17 12.5C17 15.26 14.76 17.5 12 17.5ZM12 9.5C10.34 9.5 9 10.84 9 12.5C9 14.16 10.34 15.5 12 15.5C13.66 15.5 15 14.16 15 12.5C15 10.84 13.66 9.5 12 9.5Z"
            fill="black"
            fillOpacity="0.6"
          />
        </svg>
      )}
      {type === 'search' && !value && (
        <svg
          className={styles.eye}
          onClick={toggleVisibility}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z"
            fill="black"
            fillOpacity="0.6"
          />
        </svg>
      )}
      <span className={placeholderStyles}>{value ? placeholder : ''}</span>
      <input
        className={inputStyles}
        type={inputType}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        disabled={disabled}
      />
      {renderInfo()}
    </div>
  );
};

export default TextInput;
