import { Body, Controller, Post } from '@nestjs/common';
import { ErrorHandler } from '../Errors/ErrorHandler';
import { CreateUserDto } from '../Users/dto/create-user.dto';
import { UserService } from '../Users/users.service';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService
  ) { }

  @Public()
  @Post('/signup')
  async signup(
    @Body() createUserDto: CreateUserDto,
  ) {
    try {
      const createdUser = this.userService.create(createUserDto);
      return createdUser;
    } catch (error) {
      ErrorHandler(error);
    }
  }

  @Public()
  @Post('/login')
  async login(
    @Body() loginDto: LoginDto,
  ) {
    try {
      return await this.authService.login(loginDto);
    } catch (error) {
      ErrorHandler(error);
    }
  }
}
