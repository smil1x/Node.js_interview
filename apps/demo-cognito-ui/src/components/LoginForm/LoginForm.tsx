import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import SignIn from './components/SignIn/SignIn';
import styles from './LoginForm.module.scss';
import SocialLogin from './components/SocialLogin/SocialLogin';
import { FORM_TYPE } from './constants';
import SignUp from './components/SignUp/SignUp';
import ConfirmSignUp from './components/ConfirmSignUp/ConfirmSignup';
import { useNavigate } from 'react-router-dom';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';

const socialLogin = (provider: any) => {
  Auth.federatedSignIn({ provider });
};

function LoginForm() {
  const navigate = useNavigate();
  const [formType, setFormType] = useState(FORM_TYPE.LOG_IN);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState({});

  const updateFormType = (formType: any) => {
    if (
      formType !== FORM_TYPE.CONFIRM_SIGN_UP &&
      formType !== FORM_TYPE.FORGOT_PASSWORD_SUBMIT &&
      formType !== FORM_TYPE.NEW_PASSWORD_REQUIRED
    ) {
      setEmail('');
      setPassword('');
    }
    setError('');
    setFormType(formType);
  };

  const login = async () => {
    try {
      const user = await Auth.signIn(email, password);
      setUser(user);
      setError('');
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        setPassword('');
        updateFormType(FORM_TYPE.NEW_PASSWORD_REQUIRED);
      } else {
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const signUp = async () => {
    try {
      await Auth.signUp({
        username: email,
        password,
      });
      updateFormType(FORM_TYPE.CONFIRM_SIGN_UP);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const confirmSignUp = async (code: any) => {
    try {
      await Auth.confirmSignUp(email, code);
      await login();
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const sendResetPasswordCode = async () => {
    try {
      await Auth.forgotPassword(email);
      updateFormType(FORM_TYPE.FORGOT_PASSWORD_SUBMIT);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const resetPasswordSubmit = async (confirmationCode: any) => {
    try {
      await Auth.forgotPasswordSubmit(email, confirmationCode, password);
      await login();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const forceChangePassword = async () => {
    try {
      await Auth.completeNewPassword(user, password);
      await login();
    } catch (e: any) {
      setError(e.message || e);
    }
  };

  const renderForm = () => {
    switch (formType) {
      case FORM_TYPE.LOG_IN:
        return (
          <SignIn
            updateFormType={updateFormType}
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            login={login}
            error={error}
          />
        );
      case FORM_TYPE.SIGN_UP:
        return (
          <SignUp
            updateFormType={updateFormType}
            error={error}
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            signUp={signUp}
          />
        );
      case FORM_TYPE.CONFIRM_SIGN_UP:
        return <ConfirmSignUp confirmSignUp={confirmSignUp} error={error} />;
      case FORM_TYPE.FORGOT_PASSWORD:
        return <ForgotPassword resetPassword={sendResetPasswordCode} email={email} setEmail={setEmail} error={error} />;
      case FORM_TYPE.FORGOT_PASSWORD_SUBMIT:
        return (
          <ResetPassword
            resetPasswordSubmit={resetPasswordSubmit}
            password={password}
            setPassword={setPassword}
            error={error}
          />
        );
      case FORM_TYPE.NEW_PASSWORD_REQUIRED:
        return (
          <ResetPassword
            resetPasswordSubmit={forceChangePassword}
            password={password}
            setPassword={setPassword}
            error={error}
            force
          />
        );
      default:
        return null;
    }
  };

  const renderFooter = () => {
    if (formType === FORM_TYPE.LOG_IN || formType === FORM_TYPE.SIGN_UP) {
      const accountMsg = formType === FORM_TYPE.LOG_IN ? 'No account?' : 'Have an account?';
      const nextFormType = formType === FORM_TYPE.LOG_IN ? FORM_TYPE.SIGN_UP : FORM_TYPE.LOG_IN;

      return (
        <>
          <SocialLogin login={socialLogin} formType={formType} />
          <div className={styles.footer}>
            <span>{accountMsg}</span>
            <em onClick={() => updateFormType(nextFormType)}>{nextFormType}</em>
          </div>
        </>
      );
    } else return null;
  };

  return (
    <div className={styles.container}>
      {renderForm()}
      {renderFooter()}
    </div>
  );
}

export default LoginForm;
