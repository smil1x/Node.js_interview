import React from 'react';
import styles from './ForgotPassword.module.scss';
import { Button, TextInput } from '../../../shared';

function ForgotPassword({ resetPassword, email, setEmail, error }: any) {
  const forgotPasswordError = {
    messages: [error],
    level: 'error',
  };

  return (
    <div className={styles.container}>
      <p className="formName">Forgot your password?</p>
      <span className="formDescription">enter your Email below and we will send a message to reset your password</span>
      <TextInput value={email} placeholder={'Email'} onChange={setEmail} info={error && forgotPasswordError} />
      <Button onClick={resetPassword} color={'primary'}>
        Reset
      </Button>
    </div>
  );
}

export default ForgotPassword;
