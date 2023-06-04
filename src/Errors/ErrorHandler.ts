import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import {
  InvalidIdError,
  RequiredFieldsIsMissedError,
  UserNotFoundError,
  WrongPasswordError,
} from './ServiceError';

export function ErrorHandler(error: unknown): void {
  if (error instanceof InvalidIdError) {
    throw new BadRequestException(error.message);
  } else if (error instanceof UserNotFoundError) {
    throw new NotFoundException(error.message);
  } else if (error instanceof RequiredFieldsIsMissedError) {
    throw new BadRequestException(error.message);
  } else if (error instanceof WrongPasswordError) {
    throw new ForbiddenException(error.message);
  }
}
