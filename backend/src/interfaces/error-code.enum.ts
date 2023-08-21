export enum EErrorCode {
  NO_AUTH_TOKEN = 'No auth token',
  INVALID_AUTH_TOKEN = 'Invalid auth token',
  NO_USER_WITH_THIS_ID = 'No user with this id',
  NO_USER_WITH_THIS_CREDENTIALS = 'No user with this creadentials',
  USER_WITH_THIS_EMAIL_ALREADY_EXISTS = 'User with this email already exists',
  CANT_LOGIN_USER = 'Error occurred while user logging',
  CANT_CREATE_USER = 'Error occurred while user creating',
  PERMISSIONS_DENIED = 'Permissions denied',
  NO_ACTUAL_COUNTER = 'No actual counter',
  CANT_UPDATE_COUNTER = 'Error occurred while counter updating'
};
