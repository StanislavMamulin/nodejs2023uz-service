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
  NotFoundType,
} from './ServiceError';
import { Prisma } from '@prisma/client';

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

export function ServiceErrorsHandler(
  error: unknown,
  typeOfService?: NotFoundType,
) {
  if (error instanceof Prisma.PrismaClientKnownRequestError && typeOfService) {
    if (error.code === 'P2025') {
      throw new NotFoundError(typeOfService);
    }
  }

  throw error;
}
