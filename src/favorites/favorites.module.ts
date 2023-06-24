import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [PrismaModule],
})
export class FavoritesModule {}
