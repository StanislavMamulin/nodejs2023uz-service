import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Prisma, User as PrismaUser } from '@prisma/client';

import { User, UserResponse } from './interfaces/user.interface';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserNotFoundError, WrongPasswordError } from '../Errors/ServiceError';
import { PrismaService } from '../prisma/prisma.service';

function convertToUserResponse(user: PrismaUser | User): UserResponse {
  const { password, createdAt, updatedAt, ...response } = user;
  return {
    ...response,
    createdAt: Number(createdAt),
    updatedAt: Number(updatedAt),
  };
}

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    const users = await this.prisma.user.findMany();
    return users.map(convertToUserResponse);
  }

  async getUserById(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        throw new UserNotFoundError();
      }

      return convertToUserResponse(user);
    } catch (error) {
      throw error;
    }
  }

  async create(userDto: CreateUserDto): Promise<UserResponse> {
    try {
      const { login, password } = userDto;

      const now = Date.now();

      const newUser: User = {
        id: uuidv4(),
        login,
        password,
        version: 1,
        createdAt: now,
        updatedAt: now,
      };

      await this.prisma.user.create({
        data: newUser,
      });

      return convertToUserResponse(newUser);
    } catch (error) {
      console.error(error);
      throw error;
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
        throw new UserNotFoundError();
      }

      if (user.password !== oldPassword) {
        throw new WrongPasswordError();
      }

      const changedUserData = {
        password: newPassword,
        version: user.version + 1,
        updatedAt: Date.now(),
      };

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: changedUserData,
      });

      return convertToUserResponse(updatedUser);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new UserNotFoundError();
        }
      }

      throw error;
    }
  }
}
