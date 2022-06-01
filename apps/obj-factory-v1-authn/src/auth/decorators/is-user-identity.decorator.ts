import { registerDecorator, ValidationOptions } from 'class-validator';
import { userIdentityRegExps } from '../constants';

export function IsUserIdentity(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isLongerThan',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return userIdentityRegExps.reduce((isIdentity, regExp) => isIdentity || regExp.test(value), false);
        },
      },
    });
  };
}
