export const INCORRECT_IDENTITY = 'identity must be email/phone/username';
export const INCORRECT_PHONE = 'wrong phone format';
export const INCORRECT_EMAIL = 'wrong email format';
export const INCORRECT_PASSWORD =
  'password: minimum eight characters, at least one uppercase letter, one lowercase letter and one number';

export const userNameConstrains = (minLength = 4, maxLength = 26) =>
  `${minLength}-${maxLength} characters long, no _ or . at the beginning and at the end, [a-zA-Z0-9._] allowed characters, at least one character [a-zA-Z]`;
