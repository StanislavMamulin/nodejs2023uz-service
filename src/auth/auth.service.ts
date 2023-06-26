import { ForbiddenException, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { login, password } = loginDto;

    try {
      const user = await this.prisma.user.findFirst({
        where: { login },
      });

      if (!user) {
        throw new ForbiddenException('Incorrect login or password');
      }

      const passwordMatch: boolean = await compare(password, user.password);

      if (!passwordMatch) {
        throw new ForbiddenException('Incorrect login or password');
      }

      const payload = {
        sub: user.id,
        login: user.login,
      };

      const token = {
        accessToken: await this.jwtService.signAsync(payload),
      };

      return token;
    } catch (error) {
      throw error;
    }
  }
}
