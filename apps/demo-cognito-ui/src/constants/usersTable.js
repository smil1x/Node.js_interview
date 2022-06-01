export const USERS_TABLE_FIELDS = [
  { field: 'username' },
  { field: 'enabled' },
  { field: 'accountStatus' },
  { field: 'email' },
  { field: 'emailVerified' },
  { field: 'phoneNumberVerified' },
  { field: 'updated' },
  { field: 'created' },
];

export const USERS_SELECT_FILTER_OPTIONS = [
  { value: 'username', label: 'User Name' },
  { value: 'email', label: 'Email' },
  { value: 'cognito:user_status', label: 'Status' },
];
