import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  InvalidIdError,
  RequiredFieldsIsMissedError,
  UserNotFoundError,
  TrackNotFoundError,
  WrongPasswordError,
  NotFoundError,
} from './ServiceError';

export function ErrorHandler(error: unknown): void {
  if (error instanceof InvalidIdError) {
    throw new BadRequestException(error.message);
  } else if (
    error instanceof UserNotFoundError ||
    error instanceof TrackNotFoundError ||
    error instanceof NotFoundError
  ) {
    throw new NotFoundException(error.message);
  } else if (error instanceof RequiredFieldsIsMissedError) {
    throw new BadRequestException(error.message);
  } else if (error instanceof WrongPasswordError) {
    throw new ForbiddenException(error.message);
  } else {
    throw new InternalServerErrorException();
  }
}
