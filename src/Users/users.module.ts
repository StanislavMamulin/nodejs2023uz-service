import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { DBService } from '../DB/DB.service';

@Module({
  controllers: [UsersController],
  providers: [UserService, DBService],
})
export class UsersModule {}
