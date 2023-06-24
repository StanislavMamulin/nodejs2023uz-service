import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { GetByIdParams } from '../validators/findById.validator';
import { ErrorHandler } from '../Errors/ErrorHandler';
import { SubjectType } from './interfaces/operationType';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async getFavorites() {
    try {
      return await this.favoritesService.getFavorites();
    } catch (error) {
      console.error(error);
    }
  }

  @Post('/track/:id')
  async addTrack(@Param() params: GetByIdParams) {
    const { id } = params;
    try {
      await this.favoritesService.addToFavorites(id, SubjectType.TRACK);
    } catch (error) {
      ErrorHandler(error);
    }
  }

  @Delete('/track/:id')
  @HttpCode(204)
  async deleteTrack(@Param() params: GetByIdParams) {
    const { id } = params;
    try {
      await this.favoritesService.deleteFromFavorites(id, SubjectType.TRACK);
    } catch (error) {
      ErrorHandler(error);
    }
  }

  @Post('/album/:id')
  async addAlbum(@Param() params: GetByIdParams) {
    const { id } = params;
    try {
      await this.favoritesService.addToFavorites(id, SubjectType.ALBUM);
    } catch (error) {
      ErrorHandler(error);
    }
  }

  @Delete('/album/:id')
  @HttpCode(204)
  async deleteAlbum(@Param() params: GetByIdParams) {
    const { id } = params;
    try {
      await this.favoritesService.deleteFromFavorites(id, SubjectType.ALBUM);
    } catch (error) {
      ErrorHandler(error);
    }
  }

  @Post('/artist/:id')
  async addArtist(@Param() params: GetByIdParams) {
    const { id } = params;
    try {
      await this.favoritesService.addToFavorites(id, SubjectType.ARTIST);
    } catch (error) {
      ErrorHandler(error);
    }
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  async deleteArtist(@Param() params: GetByIdParams) {
    const { id } = params;
    try {
      await this.favoritesService.deleteFromFavorites(id, SubjectType.ARTIST);
    } catch (error) {
      ErrorHandler(error);
    }
  }
}
