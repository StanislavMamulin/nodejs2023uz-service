import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './Users/users.module';
import { TracksModule } from './tracks/tracks.module';
import { ArtistsModule } from './Artists/artists.module';
import { AlbumsModule } from './Albums/albums.module';
import { PrismaModule } from './prisma/prisma.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [
    UsersModule,
    TracksModule,
    ArtistsModule,
    AlbumsModule,
    PrismaModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
