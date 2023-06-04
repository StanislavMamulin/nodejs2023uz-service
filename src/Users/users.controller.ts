import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserResponse } from './interfaces/user.interface';

@Controller('user')
export class UsersController {
  @Get()
  getAllUsers(): UserResponse[] {}

  @Get(':id')
  getOneUser(@Param('id') id: string): UserResponse {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): UserResponse {}

  @Put(':id')
  updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): UserResponse {}

  @Delete(':id')
  deleteUser(@Param('id') id: string) {}
}
