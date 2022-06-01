import React, { useEffect, useState } from 'react';
import styles from './ResetPassword.module.scss';
import { Button, TextInput } from '../../../shared';

const FORM_NAME = {
  FORGOT_RESET: 'Forgot your password?',
  FORCE_RESET: 'Change Password',
};

const FORM_DESCRIPTION = {
  FORGOT_RESET: 'We have sent a password reset code by email. Enter it below to reset your password.',
  FORCE_RESET: 'Please enter your new password below.',
};

function ResetPassword({ resetPasswordSubmit, password, setPassword, error, force }: any) {
  const [code, setCode] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changePasswordError, setChangePasswordError] = useState({});

  useEffect(() => {
    if (error) {
      setChangePasswordError({
        messages: [error],
        level: 'error',
      });
    }
  }, [error]);

  const submit = () => {
    if (confirmPassword === password) {
      resetPasswordSubmit(code);
      setChangePasswordError({});
    } else {
      setChangePasswordError({
        messages: ['Your passwords must match'],
        level: 'error',
      });
    }
  };

  return (
    <div className={styles.container}>
      <p className="formName">{force ? FORM_NAME.FORCE_RESET : FORM_NAME.FORGOT_RESET}</p>
      <span className="formDescription">{force ? FORM_DESCRIPTION.FORCE_RESET : FORM_DESCRIPTION.FORGOT_RESET}</span>
      {!force && <TextInput value={code} placeholder={'Code'} onChange={setCode} />}
      <TextInput
        value={password}
        placeholder={'New Password'}
        onChange={setPassword}
        info={changePasswordError}
        type={'password'}
      />
      <TextInput
        value={confirmPassword}
        placeholder={'Confirm Password'}
        onChange={setConfirmPassword}
        type={'password'}
      />
      <Button onClick={submit} color={'primary'}>
        Change Password
      </Button>
    </div>
  );
}

export default ResetPassword;
