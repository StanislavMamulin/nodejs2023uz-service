import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  InvalidIdError,
  RequiredFieldsIsMissedError,
  UserNotFoundError,
  TrackNotFoundError,
  WrongPasswordError,
  NotFoundError,
  NotFoundType,
  ItemDoesNotExistError,
  NotExistType,
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
  } else if (error instanceof WrongPasswordError || error instanceof ForbiddenException) {
    throw new ForbiddenException(error.message);
  } else if (error instanceof ItemDoesNotExistError) {
    throw new UnprocessableEntityException(error.message);
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

export function NotExistErrorsHandler(
  error: unknown,
  typeOfService?: NotExistType,
) {
  if (error instanceof Prisma.PrismaClientKnownRequestError && typeOfService) {
    if (error.code === 'P2025') {
      throw new ItemDoesNotExistError(typeOfService);
    }
  }

  throw error;
}
