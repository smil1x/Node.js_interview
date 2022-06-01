import Amplify, { Auth } from 'aws-amplify';
import CONFIG from '../config';
import { errorHandler } from '../utils/errors.utils';
import { setAWSCredentials } from './congito';

export const getUserIdToken = async () => {
  try {
    const data = await Auth.currentAuthenticatedUser();
    return data.signInUserSession.idToken.jwtToken;
  } catch (err) {
    errorHandler(err);
  }
};

export const authListener = (data: any) => {
  switch (data.payload.event) {
    case 'signIn':
      setAWSCredentials(data.payload.data.signInUserSession.idToken.jwtToken);
      break;
    case 'signUp':
      console.log('user signed up');
      break;
    case 'signOut':
      setAWSCredentials(null);
      break;
    case 'signIn_failure':
      console.log('user sign in failed');
      break;
    case 'tokenRefresh':
      setAWSCredentials(data.payload.data.signInUserSession.idToken.jwtToken);
      break;
    case 'tokenRefresh_failure':
      console.log('token refresh failed');
      break;
    case 'configured':
      console.log('the Auth module is configured');
      break;
    default:
      console.log('unknown Auth event');
  }
};

export const setAmplifyConfig = () => {
  Amplify.configure({
    Auth: {
      region: CONFIG.COGNITO_REGION,
      userPoolId: CONFIG.COGNITO_USER_POOL_ID,
      userPoolWebClientId: CONFIG.COGNITO_USER_CLIENT_ID,
      mandatorySignIn: false,
      authenticationFlowType: 'USER_PASSWORD_AUTH',
      oauth: {
        domain: CONFIG.COGNITO_DOMAIN,
        scope: CONFIG.COGNITO_SCOPE.split(', '),
        redirectSignIn: CONFIG.OAUTH_REDIRECT_SIGN_IN,
        redirectSignOut: CONFIG.OAUTH_REDIRECT_SIGN_OUT,
        responseType: CONFIG.OAUTH_RESPONSE_TYPE,
      },
    },
  });
};
