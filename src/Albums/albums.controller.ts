import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ErrorHandler } from '../Errors/ErrorHandler';
import { GetByIdParams } from '../validators/findById.validator';
import { Album } from './interfaces/album.interface';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  getAllAlbums(): Promise<Album[]> {
    try {
      return this.albumsService.getAll();
    } catch (error) {
      ErrorHandler(error);
    }
  }

  @Get(':id')
  async getAlbum(@Param() params: GetByIdParams): Promise<Album> {
    const { id } = params;
    try {
      return await this.albumsService.getAlbum(id);
    } catch (error) {
      ErrorHandler(error);
    }
  }

  @Post()
  async createAlbum(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    try {
      return await this.albumsService.create(createAlbumDto);
    } catch (error) {
      ErrorHandler(error);
    }
  }

  @Put(':id')
  async updateAlbumInfo(
    @Param() params: GetByIdParams,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    const { id } = params;

    try {
      return await this.albumsService.update(id, updateAlbumDto);
    } catch (error) {
      ErrorHandler(error);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteAlbum(@Param() params: GetByIdParams): Promise<void> {
    const { id } = params;
    try {
      await this.albumsService.deleteAlbum(id);
    } catch (error) {
      ErrorHandler(error);
    }
  }
}
