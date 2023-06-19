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
  getAllAlbums() {
    try {
      return this.albumsService.getAll();
    } catch (error) {
      ErrorHandler(error);
    }
  }

  @Get(':id')
  getAlbum(@Param() params: GetByIdParams) {
    const { id } = params;
    try {
      return this.albumsService.getAlbum(id);
    } catch (error) {
      ErrorHandler(error);
    }
  }

  @Post()
  createAlbum(@Body() createAlbumDto: CreateAlbumDto): Album {
    try {
      return this.albumsService.create(createAlbumDto);
    } catch (error) {
      ErrorHandler(error);
    }
  }

  @Put(':id')
  updateAlbumInfo(
    @Param() params: GetByIdParams,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const { id } = params;

    try {
      return this.albumsService.update(id, updateAlbumDto);
    } catch (error) {
      ErrorHandler(error);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param() params: GetByIdParams) {
    const { id } = params;
    try {
      return this.albumsService.deleteAlbum(id);
    } catch (error) {
      ErrorHandler(error);
    }
  }
}
