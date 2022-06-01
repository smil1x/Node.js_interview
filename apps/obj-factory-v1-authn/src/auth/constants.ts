export const SECRET_KEY = Symbol('SECRET_KEY');

export const CRYPTO_ALGORITHM = 'sha512';
export const CRYPTO_ENCODING = 'hex';

//minimum eight characters,
// at least one uppercase letter, one lowercase letter and one number
export const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

//username is 4-26 characters long
//no _ or . at the beginning
//no __ or _. or ._ or .. inside
//[a-zA-Z0-9._] allowed characters
//at least one character [a-zA-Z]
//no _ or . at the end
export const usernameRegExp = (minLength = 4, maxLength = 26) =>
  new RegExp(`^(?=[a-zA-Z0-9._]{${minLength},${maxLength}}$)(?!.*[_.]{2})(?=.*[a-zA-Z])[^_.].*[^_.]$`);

// https://regexr.com/68emp
export const phoneRegExp = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-. ]*(\d+))?)\s*$/;

// https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
export const emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const userIdentityRegExps = [usernameRegExp(), phoneRegExp, emailRegExp];

export const JWT_STRATEGY = 'jwt';
