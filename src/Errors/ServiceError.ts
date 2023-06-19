import { ErrorMessages } from './errorMessages';

enum ErrorCodes {
  INVALID_ID,
  NOT_FOUND,
  REQUIRED_FIELDS_IS_MISSED,
  WRONG_PASSWORD,
  NOT_EXIST,
}

export enum NotFoundType {
  USER = 'USER_NOT_FOUND',
  TRACK = 'TRACK_NOT_FOUND',
  ARTIST = 'ARTIST_NOT_FOUND',
  ALBUM = 'ALBUM_NOT_FOUND',
}

export enum NotExistType {
  TRACK_DOES_NOT_EXIST = 'TRACK_DOES_NOT_EXIST',
  ALBUM_DOES_NOT_EXIST = 'ALBUM_DOES_NOT_EXIST',
  ARTIST_DOES_NOT_EXIST = 'ARTIST_DOES_NOT_EXIST',
  FAVORITES_DOES_NOT_EXIST = 'FAVORITES_DOES_NOT_EXIST',
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

export class NotFoundError extends ServiceError {
  constructor(notFoundType: NotFoundType) {
    const message: string =
      ErrorMessages[notFoundType] || ErrorMessages.DEFAULT_NOT_FOUND;
    super(message, ErrorCodes.NOT_FOUND);
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

export class ItemDoesNotExistError extends ServiceError {
  constructor(notFoundType: NotExistType) {
    const message: string =
      ErrorMessages[notFoundType] || ErrorMessages.DEFAULT_NOT_FOUND;
    super(message, ErrorCodes.NOT_EXIST);
  }
}
