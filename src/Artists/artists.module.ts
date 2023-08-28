import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { DBService } from '../DB/DB.service';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, DBService],
})
export class ArtistsModule {}
