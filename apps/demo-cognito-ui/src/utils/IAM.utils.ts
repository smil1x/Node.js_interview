import { errorHandler } from './errors.utils';
import { roleListType } from 'aws-sdk/clients/iam';
import { setAWSConfig } from '../AWS';
const AWS = require('aws-sdk');

export const listRoles = async (): Promise<roleListType> => {
  await setAWSConfig()
  let roles;
  const IAM = new AWS.IAM();
  await IAM.listRoles((err: any, data: any) => {
    if (err) {
      errorHandler(err)
    }
    if (data) {
      roles = data.Roles;
    }
  }).promise();
  return roles
}
