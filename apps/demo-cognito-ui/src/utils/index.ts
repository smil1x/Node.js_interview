import CONFIG from '../config';
import { errorHandler } from './errors.utils';
import { CreateGroupRequest } from 'aws-sdk/clients/cognitoidentityserviceprovider';

const AWS = require('aws-sdk');

export const getListUsers = async ({ cognitoIdentityServiceProvider, params }: any) => {
  try {
    let data = await cognitoIdentityServiceProvider.listUsers(params).promise();
    let users = data.Users.map((user: any) => {
      const email = user.Attributes.find((atr: any) => atr.Name === 'email')?.Value;
      const emailVerified = user.Attributes.find((atr: any) => atr.Name === 'email_verified')?.Value;
      return {
        username: user.Username,
        enabled: user.Enabled ? 'Enabled' : 'No',
        accountStatus: user.UserStatus,
        email: email || 'N/A',
        emailVerified: emailVerified || 'false',
        phoneNumberVerified: '-',
        updated: user.UserLastModifiedDate,
        created: user.UserCreateDate,
      };
    });

    return { users, PaginationToken: data.PaginationToken };
  } catch (err) {
    errorHandler(err);
  }
};

export const getUsers = async ({ params }: any) => {
  try {
    const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
    const { users, PaginationToken } = await getListUsers({ cognitoIdentityServiceProvider, params });
    console.log({ users, PaginationToken });
    return { users, PaginationToken };
  } catch (err) {
    errorHandler(err);
  }
};

export const getGroups = async (limit: number) => {
  try {
    const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
    const data = await cognitoIdentityServiceProvider.listGroups({
      Limit: limit,
      UserPoolId: CONFIG.COGNITO_USER_POOL_ID,
    }).promise();
    const groups = data.Groups.map((group: any) => {
      return {
        groupName: group.GroupName,
        userPoolId: group.UserPoolId,
        description: group.Description,
        roleArn: group.RoleArn,
        precedence: group.Precedence,
      };
    });
    return { groups };
  } catch (err) {
    errorHandler(err);
  }
};

export const createUser = async ({ email, temporaryPwd, sendInvite, ...attrs }: any) => {
  try {
    const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

    const userAttributes = Object.entries(attrs).map(([key, value]) => ({ Name: key, Value: value.toString() }));
    await cognitoIdentityServiceProvider
      .adminCreateUser({
        UserPoolId: CONFIG.COGNITO_USER_POOL_ID,
        Username: email,
        MessageAction: sendInvite ? undefined : 'SUPPRESS',
        UserAttributes: [...userAttributes, { Name: 'email', Value: email }],
        TemporaryPassword: temporaryPwd || undefined,
      })
      .promise();
  } catch (err) {
    errorHandler(err);
  }
};

export const getUserPoolDescription = async () => {
  const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
  let userPoolDescription = await cognitoIdentityServiceProvider
    .describeUserPool({ UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID })
    .promise();
  return userPoolDescription;
};

export const deleteUser = async (Username: string) => {
  const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
  try {
    await cognitoIdentityServiceProvider
      .adminDeleteUser({ Username, UserPoolId: CONFIG.COGNITO_USER_POOL_ID })
      .promise();
  } catch (e) {
    console.log(e);
  }
};

export const changeEnabledStatus = async (state: any, Username: any) => {
  const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
  try {
    if (state === 'Enabled') {
      await cognitoIdentityServiceProvider
        .adminEnableUser({ Username, UserPoolId: CONFIG.COGNITO_USER_POOL_ID })
        .promise();
      return;
    }
    await cognitoIdentityServiceProvider
      .adminDisableUser({ Username, UserPoolId: CONFIG.COGNITO_USER_POOL_ID })
      .promise();
    return;
  } catch (e) {
    console.log(e);
  }
};


export const createGroup = async (params: Omit<CreateGroupRequest, 'UserPoolId'>) => {
  const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
  try {
    const data = await cognitoIdentityServiceProvider.createGroup({
      GroupName: params.GroupName,
      Description: params.Description || undefined,
      Precedence: params.Precedence,
      RoleArn: params.RoleArn || undefined,
      UserPoolId: CONFIG.COGNITO_USER_POOL_ID,
    }).promise();
    console.log(data);
  } catch (err) {
    errorHandler(err);
  }

};
