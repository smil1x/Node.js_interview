import React from 'react';
import { Button } from '../../../shared';
import styles from './SocialLogin.module.scss';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';

const SocialLogin = ({ login, formType }: any) => {
  return (
    <div className={styles.container}>
      <Button
        onClick={() => {
          login(CognitoHostedUIIdentityProvider.Google);
        }}
        color={'secondary'}
      >
        <div className={styles.socialButton}>
          <svg
            className={styles.icon}
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z'
              fill='#FFC107'
            />
            <path
              d='M3.15302 7.3455L6.43851 9.755C7.32752 7.554 9.48052 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15902 2 4.82802 4.1685 3.15302 7.3455Z'
              fill='#FF3D00'
            />
            <path
              d='M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5717 17.5742 13.3037 18.001 12 18C9.39897 18 7.19047 16.3415 6.35847 14.027L3.09747 16.5395C4.75247 19.778 8.11347 22 12 22Z'
              fill='#4CAF50'
            />
            <path
              d='M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z'
              fill='#1976D2'
            />
          </svg>
          <span>{formType} with google</span>
        </div>
      </Button>
      <Button
        onClick={() => {
          login(CognitoHostedUIIdentityProvider.Facebook);
        }}
        color={'secondary'}
      >
        <div className={styles.socialButton}>
          <svg
            className={styles.icon}
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g clipPath='url(#clip0_22_141)'>
              <path
                d='M22.6754 24.0001C23.4068 24.0001 24 23.407 24 22.6755V1.32459C24 0.592969 23.4068 0 22.6754 0H1.32459C0.592875 0 0 0.592969 0 1.32459V22.6755C0 23.407 0.592875 24.0001 1.32459 24.0001H22.6754Z'
                fill='#395185'
              />
              <path
                d='M16.5596 24.0001V14.706H19.6793L20.1463 11.084H16.5596V8.77138C16.5596 7.72269 16.8508 7.00803 18.3547 7.00803L20.2727 7.00719V3.76766C19.9408 3.7235 18.8023 3.62488 17.4778 3.62488C14.7124 3.62488 12.8192 5.31285 12.8192 8.41278V11.084H9.69153V14.706H12.8192V24.0001H16.5596Z'
                fill='white'
              />
            </g>
            <defs>
              <clipPath id='clip0_22_141'>
                <rect width='24' height='24' fill='white' />
              </clipPath>
            </defs>
          </svg>
          <span>{formType} with FACEBOOK</span>
        </div>
      </Button>
    </div>
  );
};

export default SocialLogin;
