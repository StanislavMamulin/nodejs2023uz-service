import { Module } from '@nestjs/common';
import { DBService } from './DB.service';

@Module({
  providers: [DBService],
})
export class DBModule {}
