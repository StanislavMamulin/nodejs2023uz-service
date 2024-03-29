import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User as PrismaUser } from '@prisma/client';
import { hash, compare } from 'bcrypt';

import { User, UserResponse } from './interfaces/user.interface';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import {
  NotFoundError,
  NotFoundType,
  WrongPasswordError,
} from '../Errors/ServiceError';
import { PrismaService } from '../prisma/prisma.service';
import { ServiceErrorsHandler } from '../Errors/ErrorHandler';

function convertToUserResponse(user: PrismaUser | User): UserResponse {
  const { password, createdAt, updatedAt, ...response } = user;
  return {
    ...response,
    createdAt: Number(createdAt),
    updatedAt: Number(updatedAt),
  };
}

function getHashedPassword(password: string): Promise<string> {
  const salt = Number(process.env.SALT) || 10;
  return hash(password, salt);
}

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<UserResponse[]> {
    try {
      const users = await this.prisma.user.findMany();
      return users.map(convertToUserResponse);
    } catch (error) {
      ServiceErrorsHandler(error);
    }
  }

  async getUserById(id: string): Promise<UserResponse> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new NotFoundError(NotFoundType.USER);
      }

      return convertToUserResponse(user);
    } catch (error) {
      ServiceErrorsHandler(error);
    }
  }

  async create(userDto: CreateUserDto): Promise<UserResponse> {
    try {
      const { login, password } = userDto;

      const now: number = Date.now();

      const passwordHash = await getHashedPassword(password);

      const newUser: User = {
        id: uuidv4(),
        login,
        password: passwordHash,
        version: 1,
        createdAt: now,
        updatedAt: now,
      };

      await this.prisma.user.create({
        data: newUser,
      });

      return convertToUserResponse(newUser);
    } catch (error) {
      ServiceErrorsHandler(error);
    }
  }

  async updatePassword(
    id: string,
    passwords: UpdatePasswordDto,
  ): Promise<UserResponse> {
    try {
      const { oldPassword, newPassword } = passwords;

      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new NotFoundError(NotFoundType.USER);
      }

      const passwordMatch: boolean = await compare(oldPassword, user.password);

      if (!passwordMatch) {
        throw new WrongPasswordError();
      }

      const changedUserData = {
        password: await getHashedPassword(newPassword),
        version: user.version + 1,
        updatedAt: Date.now(),
      };

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: changedUserData,
      });

      return convertToUserResponse(updatedUser);
    } catch (error) {
      ServiceErrorsHandler(error, NotFoundType.USER);
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      ServiceErrorsHandler(error, NotFoundType.USER);
    }
  }
}
