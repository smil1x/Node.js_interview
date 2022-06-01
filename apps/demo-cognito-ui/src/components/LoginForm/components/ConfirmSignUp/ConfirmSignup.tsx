import React, { useState } from 'react';
import styles from './ConfirmSignUp.module.scss';
import { Button, TextInput } from '../../../shared';

function ConfirmSignUp({ confirmSignUp, error }: any) {
  const [confirmationCode, setConfirmationCode] = useState('');
  const confirmSignUpError = {
    messages: [error],
    level: 'error',
  };

  return (
    <div className={styles.container}>
      <p className='formName'>Verifying Email</p>
      <span className='formDescription'>enter verification code below</span>
      <TextInput
        value={confirmationCode.trim()}
        placeholder={'Verification Code'}
        onChange={setConfirmationCode}
        info={error && confirmSignUpError}
      />
      <Button
        onClick={() => {
          confirmSignUp(confirmationCode);
        }}
        color={'primary'}
      >
        LOG IN
      </Button>
    </div>
  );
}

export default ConfirmSignUp;
