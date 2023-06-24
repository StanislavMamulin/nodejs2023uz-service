import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
  HttpCode,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserResponse } from './interfaces/user.interface';
import { UserService } from './users.service';
import { ErrorHandler } from '../Errors/ErrorHandler';
import { GetByIdParams } from '../validators/findById.validator';

@Controller('user')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<UserResponse[]> {
    try {
      const users = await this.userService.getAllUsers();
      return users;
    } catch (error: unknown) {
      ErrorHandler(error);
    }
  }

  @Get(':id')
  async getOneUser(@Param() params: GetByIdParams): Promise<UserResponse> {
    const { id } = params;

    try {
      const user = await this.userService.getUserById(id);

      return user;
    } catch (error) {
      ErrorHandler(error);
    }
  }

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponse> {
    try {
      const createdUser = this.userService.create(createUserDto);
      return createdUser;
    } catch (error) {
      ErrorHandler(error);
    }
  }

  @Put(':id')
  async updatePassword(
    @Param() params: GetByIdParams,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserResponse> {
    const { id } = params;
    try {
      const updatedUser = await this.userService.updatePassword(
        id,
        updatePasswordDto,
      );
      return updatedUser;
    } catch (error) {
      ErrorHandler(error);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param() params: GetByIdParams): Promise<void> {
    const { id } = params;

    try {
      await this.userService.deleteUser(id);
    } catch (error) {
      ErrorHandler(error);
    }
  }
}
