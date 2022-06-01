import React, { useEffect, useState } from 'react';
import styles from './SignUp.module.scss';
import { Button, TextInput } from '../../../shared';

const defaultPwdInfo = {
  messages: ['Must contain at least 8 characters, a number, and an upper case letter'],
  level: 'info',
};

const SignUp = ({ password, email, setEmail, setPassword, signUp, error }: any) => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdConfirmationError, setConfirmationError] = useState({});
  const [pwdError, setPwdError] = useState(defaultPwdInfo);
  const [emailError, setEmailError] = useState({});

  useEffect(() => {
    if (error) {
      error.match(/email/gi)
        ? setEmailError({
            messages: [error],
            level: 'error',
          })
        : setPwdError({
            messages: [error],
            level: 'error',
          });
    }
  }, [error]);

  const submit = () => {
    if (confirmPassword === password) {
      setPwdError(defaultPwdInfo);
      setEmailError({});
      setConfirmationError({});
      signUp();
    } else {
      setPwdError(defaultPwdInfo);
      setConfirmationError({
        messages: ['Your passwords must match'],
        level: 'error',
      });
    }
  };
  return (
    <div className={styles.container}>
      <p className="formName">Sign Up</p>
      <span className="formDescription">to have an access</span>
      <TextInput value={email} placeholder={'Email'} onChange={setEmail} info={emailError} />
      <TextInput value={password} placeholder={'Password'} onChange={setPassword} type={'password'} info={pwdError} />
      <TextInput
        value={confirmPassword}
        placeholder={'Confirm Password'}
        onChange={setConfirmPassword}
        type={'password'}
        info={pwdConfirmationError}
      />
      <Button onClick={submit} color={'primary'}>
        SIGN UP
      </Button>
    </div>
  );
};

export default SignUp;
