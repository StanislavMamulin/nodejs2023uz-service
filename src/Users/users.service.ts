import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { User, UserResponse } from './interfaces/user.interface';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserNotFoundError, WrongPasswordError } from '../Errors/ServiceError';

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
    const user: User | undefined = this.users.find((user) => user.id === id);
    if (!user) {
      throw new UserNotFoundError();
    }

    return convertToUserResponse(user);
  }

  create(userDto: CreateUserDto): UserResponse {
    const { login, password } = userDto;

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
    const index: number = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new UserNotFoundError();
    }

    this.users.splice(index, 1);
  }
}
