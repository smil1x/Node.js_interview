import React from 'react';
import * as yup from 'yup';
import styles from './CreateUser.module.scss';
import { Button, Popup, TextInput } from '../shared';
import Checkbox from '../shared/Checkbox/Checkbox';
import { useFormHook } from '../../hooks';
import protectedRoute from '../../protectedRoute';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../utils';

const schema = yup.object().shape({
  temporaryPwd: yup.string(),
  phone_number: yup
    .string()
    .matches(/^\+?[1-9]\d{1,14}$/, { message: 'invalid phone format', excludeEmptyString: true }), // E.164 number
  email: yup.string().email().required(),
  phone_number_verified: yup.boolean(),
  email_verified: yup.boolean(),
  sendInvite: yup.boolean(),
});

const CreateUser = ({ redirectUrl }: any) => {
  const navigate = useNavigate();
  const { formState, updateForm, isValid } = useFormHook(
    {
      temporaryPwd: '',
      phone_number: '',
      email: '',
      phone_number_verified: false,
      email_verified: false,
      sendInvite: false,
    },
    schema,
  );

  const redirect = () => {
    navigate(redirectUrl);
  };

  const handleSubmit = async () => {
    const isFormValid = await isValid();
    if (isFormValid) {
      const { error, ...form } = formState;
      createUser(form).then(() => {
        redirect();
      });
    }
  };
  return (
    <Popup close={redirect}>
      <div className={styles.container}>
        <p className="formName">Create User</p>
        <TextInput
          value={formState.email}
          placeholder={'Email'}
          onChange={(value: any) => {
            !value && updateForm('email_verified', false);
            updateForm('email', value);
          }}
          info={formState.error.path === 'email' ? formState.error : { messages: ['Required'], level: 'info' }}
        />
        <div className={styles.checkbox}>
          <Checkbox
            label={'Mark email as verified?'}
            onChange={(value: any) => {
              updateForm('email_verified', value);
            }}
            disabled={!formState.email}
            isChecked={formState.email_verified}
            value={formState.email_verified}
          />
        </div>
        <TextInput
          value={formState.temporaryPwd}
          placeholder={'Temporary password'}
          onChange={(value: any) => {
            updateForm('temporaryPwd', value);
          }}
          type={'password'}
          info={formState.error.path === 'temporaryPwd' ? formState.error : {}}
        />
        <TextInput
          value={formState.phone_number}
          placeholder={'Phone Number'}
          onChange={(value: any) => {
            !value && updateForm('phone_number_verified', false);
            updateForm('phone_number', value);
          }}
          info={formState.error.path === 'phone_number' ? formState.error : {}}
        />
        <div className={styles.checkbox}>
          <Checkbox
            label={'Mark phone number as verified?'}
            onChange={(value: any) => {
              updateForm('phone_number_verified', value);
            }}
            disabled={!formState.phone_number}
            isChecked={formState.phone_number_verified}
            value={formState.phone_number_verified}
          />
        </div>
        <div className={styles.checkbox}>
          <Checkbox
            label={'Send an invitation to this new user by Email?'}
            onChange={(value: any) => {
              !value && updateForm('sendInvite', false);
              updateForm('sendInvite', value);
            }}
            disabled={!formState.email}
            isChecked={formState.sendInvite}
            value={formState.sendInvite}
          />
        </div>
        <Button onClick={handleSubmit} color={'primary'}>
          Create User
        </Button>
      </div>
    </Popup>
  );
};

export default protectedRoute(CreateUser);
