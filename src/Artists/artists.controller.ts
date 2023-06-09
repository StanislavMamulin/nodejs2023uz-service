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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ErrorHandler } from '../Errors/ErrorHandler';
import { GetByIdParams } from '../validators/findById.validator';
import { Artist } from './interfaces/artist.interface';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  getAllTracks() {
    try {
      return this.artistsService.getAll();
    } catch (error) {
      ErrorHandler(error);
    }
  }

  @Get(':id')
  getArtist(@Param() params: GetByIdParams) {
    const { id } = params;
    try {
      return this.artistsService.getArtist(id);
    } catch (error) {
      ErrorHandler(error);
    }
  }

  @Post()
  createTrack(@Body() createTrackDto: CreateArtistDto): Artist {
    try {
      return this.artistsService.create(createTrackDto);
    } catch (error) {
      ErrorHandler(error);
    }
  }

  @Put(':id')
  updateTrackInfo(
    @Param() params: GetByIdParams,
    @Body() updateTrackDto: UpdateArtistDto,
  ) {
    const { id } = params;

    try {
      return this.artistsService.update(id, updateTrackDto);
    } catch (error) {
      ErrorHandler(error);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param() params: GetByIdParams) {
    const { id } = params;
    try {
      return this.artistsService.deleteArtist(id);
    } catch (error) {
      ErrorHandler(error);
    }
  }
}
