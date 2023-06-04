import { Injectable } from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';

import { User, UserResponse } from './interfaces/user.interface';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import {
  InvalidIdError,
  RequiredFieldsIsMissedError,
  UserNotFoundError,
  WrongPasswordError,
} from '../Errors/ServiceError';

function convertToUserResponse(user: User): UserResponse {
  const { password, ...response } = user;
  return response;
}

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  getAllUsers(): UserResponse[] {
    return this.users.map(convertToUserResponse);
  }

  getUserById(id: string): UserResponse {
    if (!validate(id)) {
      throw new InvalidIdError();
    }

    const user: User | undefined = this.users.find((user) => user.id === id);
    if (!user) {
      throw new UserNotFoundError();
    }

    return convertToUserResponse(user);
  }

  create(userDto: CreateUserDto): UserResponse {
    const { login, password } = userDto;

    if (!login || !password) {
      throw new RequiredFieldsIsMissedError();
    }

    const newUser: User = {
      id: uuidv4(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.users.push(newUser);

    return convertToUserResponse(newUser);
  }

  updatePassword(id: string, passwords: UpdatePasswordDto): UserResponse {
    const { oldPassword, newPassword } = passwords;
    if (!oldPassword || !newPassword) {
      throw new RequiredFieldsIsMissedError();
    }

    if (!validate(id)) {
      throw new InvalidIdError();
    }

    const user: User | undefined = this.users.find((user) => user.id === id);
    if (!user) {
      throw new UserNotFoundError();
    }

    if (user.password !== oldPassword) {
      throw new WrongPasswordError();
    }

    user.password = newPassword;
    user.version++;
    user.updatedAt = Date.now();

    return convertToUserResponse(user);
  }

  deleteUser(id: string): void {
    if (!validate(id)) {
      throw new InvalidIdError();
    }

    const index: number = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new UserNotFoundError();
    }

    this.users.splice(index, 1);
  }
}
