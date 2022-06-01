import React from 'react';
import styles from './SignIn.module.scss';
import { Button, TextInput } from '../../../shared';
import { FORM_TYPE } from '../../constants';

function SignIn({ updateFormType, password, email, setEmail, setPassword, login, error }: any) {
  const signInError = {
    messages: [error],
    level: 'error',
  };

  return (
    <div className={styles.container}>
      <p className="formName">Log In</p>
      <span className="formDescription">to have an access</span>
      <TextInput
        value={email}
        placeholder={'Email'}
        onChange={setEmail}
        info={error && { messages: [], level: 'error' }}
      />
      <TextInput
        value={password}
        placeholder={'Password'}
        onChange={setPassword}
        type={'password'}
        info={error && signInError}
      />
      <em onClick={() => updateFormType(FORM_TYPE.FORGOT_PASSWORD)}>Forgot your password?</em>
      <Button onClick={login} color={'primary'}>
        LOG IN
      </Button>
    </div>
  );
}

export default SignIn;
