import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Track } from '../tracks/interfaces/track.interface';
import { FavoritesResponse } from './interfaces/favoritesResponse.interface';
import { Favorites } from './interfaces/favorites.interface';
import { Artist } from '../artists/interfaces/artist.interface';
import { Album } from '../albums/interfaces/album.interface';
import {
  NotExistErrorsHandler,
  ServiceErrorsHandler,
} from '../Errors/ErrorHandler';
import { ItemDoesNotExistError, NotExistType } from '../Errors/ServiceError';
import { ItemType } from './interfaces/operationType';

const COMMON_FAVORITES_ID = 1;

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async getFavorites(): Promise<FavoritesResponse> {
    try {
      const favs: Favorites = await this.prisma.favorites.findUnique({
        where: { id: COMMON_FAVORITES_ID },
      });

      if (!favs) {
        throw new ItemDoesNotExistError(NotExistType.FAVORITES_DOES_NOT_EXIST);
      }

      const artists: Artist[] = await this.prisma.artist.findMany({
        where: {
          id: {
            in: favs.artists,
          },
        },
      });

      const albums: Album[] = await this.prisma.album.findMany({
        where: {
          id: {
            in: favs.albums,
          },
        },
      });

      const tracks: Track[] = await this.prisma.track.findMany({
        where: {
          id: {
            in: favs.tracks,
          },
        },
      });

      return {
        albums,
        artists,
        tracks,
      };
    } catch (error) {
      ServiceErrorsHandler(error);
    }
  }

  async addToFavorites(id: string, itemType: ItemType) {
    const { prismaType, favoriteField } = itemType;

    try {
      await this.prisma[prismaType].findUniqueOrThrow({
        where: { id },
      });

      await this.prisma.favorites.update({
        where: { id: COMMON_FAVORITES_ID },
        data: {
          [favoriteField]: {
            push: id,
          },
        },
      });
    } catch (error) {
      NotExistErrorsHandler(error, NotExistType.ALBUM_DOES_NOT_EXIST);
    }
  }

  async deleteFromFavorites(id: string, itemType: ItemType) {
    const { favoriteField } = itemType;
    try {
      const favoriteItem = await this.prisma.favorites.findUniqueOrThrow({
        where: { id: COMMON_FAVORITES_ID },
        select: {
          [favoriteField]: true,
        },
      });

      const listOfIds: string[] = favoriteItem[favoriteField];

      await this.prisma.favorites.update({
        where: { id: COMMON_FAVORITES_ID },
        data: {
          [favoriteField]: listOfIds.filter((itemId) => itemId !== id),
        },
      });
    } catch (error) {
      NotExistErrorsHandler(error, NotExistType.ALBUM_DOES_NOT_EXIST);
    }
  }
}
