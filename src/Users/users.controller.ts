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
import { ErrorHandler } from 'src/Errors/ErrorHandler';
import { GetByIdParams } from 'src/validators/findById.validator';

@Controller('user')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUsers(): UserResponse[] {
    try {
      return this.userService.getAllUsers();
    } catch (error: unknown) {
      ErrorHandler(error);
    }
  }

  @Get(':id')
  getOneUser(@Param() params: GetByIdParams): UserResponse {
    const { id } = params;

    try {
      return this.userService.getUserById(id);
    } catch (error) {
      ErrorHandler(error);
    }
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): UserResponse {
    try {
      return this.userService.create(createUserDto);
    } catch (error) {
      ErrorHandler(error);
    }
  }

  @Put(':id')
  updatePassword(
    @Param() params: GetByIdParams,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): UserResponse {
    const { id } = params;
    try {
      return this.userService.updatePassword(id, updatePasswordDto);
    } catch (error) {
      ErrorHandler(error);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param() params: GetByIdParams) {
    const { id } = params;

    try {
      this.userService.deleteUser(id);
    } catch (error) {
      ErrorHandler(error);
    }
  }
}
