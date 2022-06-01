import CONFIG from '../config';
import { getUserIdToken } from './amplify';

const AWS = require('aws-sdk');

export const setAWSConfig = async () => {
  AWS.config.region = CONFIG.COGNITO_REGION;

  const idToken = await getUserIdToken();
  setAWSCredentials(idToken);
};

export const setAWSCredentials = (idToken: any) => {
  if (idToken) {
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: CONFIG.IDENTITY_POOL_ID,
      Logins: {
        [`cognito-idp.${CONFIG.COGNITO_REGION}.amazonaws.com/${CONFIG.COGNITO_USER_POOL_ID}`]: idToken,
      },
    });
  } else {
    AWS.config.credentials = null;
  }
};
