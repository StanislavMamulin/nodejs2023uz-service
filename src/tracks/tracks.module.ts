import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { DBService } from '../DB/DB.service';

@Module({
  controllers: [TracksController],
  providers: [TracksService, DBService],
})
export class TracksModule {}
