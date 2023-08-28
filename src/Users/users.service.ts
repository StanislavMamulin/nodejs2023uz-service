import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { User, UserResponse } from './interfaces/user.interface';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserNotFoundError, WrongPasswordError } from '../Errors/ServiceError';
import { DBService } from 'src/DB/DB.service';

function convertToUserResponse(user: User): UserResponse {
  const { password, ...response } = user;
  return response;
}

@Injectable()
export class UserService {
  private readonly userDB = this.dbService.userDB;

  constructor(private readonly dbService: DBService) {}

  getAllUsers(): UserResponse[] {
    return this.userDB.getAll().map(convertToUserResponse);
  }

  getUserById(id: string): UserResponse {
    const user: User | undefined = this.userDB.getById(id);
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

    this.userDB.create(newUser);

    return convertToUserResponse(newUser);
  }

  updatePassword(id: string, passwords: UpdatePasswordDto): UserResponse {
    const { oldPassword, newPassword: _ } = passwords;

    const user: User | undefined = this.userDB.getById(id);
    if (!user) {
      throw new UserNotFoundError();
    }

    if (user.password !== oldPassword) {
      throw new WrongPasswordError();
    }

    const updatedUser: User = this.userDB.update(id, passwords);

    return convertToUserResponse(updatedUser);
  }

  deleteUser(id: string): void {
    const userIndex = this.userDB.delete(id);

    if (userIndex === -1) {
      throw new UserNotFoundError();
    }
  }
}
