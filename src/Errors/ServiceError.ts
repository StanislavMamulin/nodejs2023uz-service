import { ErrorMessages } from './errorMessages';

enum ErrorCodes {
  INVALID_ID,
  NOT_FOUND,
  REQUIRED_FIELDS_IS_MISSED,
  WRONG_PASSWORD,
}

export class ServiceError extends Error {
  message: string;
  code: ErrorCodes;

  constructor(message: string, code: number) {
    super(message);
    this.message = message;
    this.code = code;
  }
}

export class InvalidIdError extends ServiceError {
  constructor(message: string = ErrorMessages.INVALID_ID) {
    super(message, ErrorCodes.INVALID_ID);
  }
}

export class UserNotFoundError extends ServiceError {
  constructor(message: string = ErrorMessages.USER_NOT_FOUND) {
    super(message, ErrorCodes.NOT_FOUND);
  }
}

export class TrackNotFoundError extends ServiceError {
  constructor(message: string = ErrorMessages.TRACK_NOT_FOUND) {
    super(message, ErrorCodes.NOT_FOUND);
  }
}

export class RequiredFieldsIsMissedError extends ServiceError {
  constructor(message: string = ErrorMessages.REQUIRED_FIELDS_IS_MISSED) {
    super(message, ErrorCodes.REQUIRED_FIELDS_IS_MISSED);
  }
}

export class WrongPasswordError extends ServiceError {
  constructor(message: string = ErrorMessages.WRONG_PASSWORD) {
    super(message, ErrorCodes.WRONG_PASSWORD);
  }
}
