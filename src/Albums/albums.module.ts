import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { DBService } from 'src/DB/DB.service';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, DBService],
})
export class AlbumsModule {}
