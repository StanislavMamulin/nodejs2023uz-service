import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [UsersController],
  providers: [UserService],
  imports: [PrismaModule],
  exports: [UserService],
})
export class UsersModule {}
