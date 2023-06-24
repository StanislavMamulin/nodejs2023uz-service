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
  async getAllArtists(): Promise<Artist[]> {
    try {
      return await this.artistsService.getAll();
    } catch (error) {
      ErrorHandler(error);
    }
  }

  @Get(':id')
  async getArtist(@Param() params: GetByIdParams): Promise<Artist> {
    const { id } = params;
    try {
      return await this.artistsService.getArtist(id);
    } catch (error) {
      ErrorHandler(error);
    }
  }

  @Post()
  async createTrack(@Body() createTrackDto: CreateArtistDto): Promise<Artist> {
    try {
      return await this.artistsService.create(createTrackDto);
    } catch (error) {
      ErrorHandler(error);
    }
  }

  @Put(':id')
  async updateTrackInfo(
    @Param() params: GetByIdParams,
    @Body() updateTrackDto: UpdateArtistDto,
  ): Promise<Artist> {
    const { id } = params;

    try {
      return await this.artistsService.update(id, updateTrackDto);
    } catch (error) {
      ErrorHandler(error);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTrack(@Param() params: GetByIdParams) {
    const { id } = params;
    try {
      await this.artistsService.deleteArtist(id);
    } catch (error) {
      ErrorHandler(error);
    }
  }
}
