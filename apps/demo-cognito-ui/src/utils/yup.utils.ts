import * as yup from 'yup';
import { AnyObject, Maybe } from 'yup/lib/types';

yup.addMethod(yup.string, 'groupPrecedence', function(errorMessage) {
  return this.test(`testNumericString`, errorMessage, function(value) {
    const { path, createError } = this;
    console.log(value);
    return ((!isNaN(value as any) && value as any >= 0 && Number.isInteger(Number(value))) || createError({
      path,
      message: errorMessage || 'must be a positive integer number',
    }));
  });
});

yup.setLocale({
  mixed: {
    required: 'field is required',
  },
  string: {
    email: () => 'invalid email format',
  },
});

declare module 'yup' {
  interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType
    > extends yup.BaseSchema<TType, TContext, TOut> {
    groupPrecedence(): StringSchema<TType, TContext>;
  }
}

export default yup;