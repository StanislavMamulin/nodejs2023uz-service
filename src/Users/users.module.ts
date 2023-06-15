import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { DBService } from '../DB/DB.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [UsersController],
  providers: [UserService, DBService],
  imports: [PrismaModule],
})
export class UsersModule {}
