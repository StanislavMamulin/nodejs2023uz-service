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
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './interfaces/track.interface';
import { ErrorHandler } from '../Errors/ErrorHandler';
import { GetByIdParams } from '../validators/findById.validator';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  async getAllTracks(): Promise<Track[]> {
    try {
      return await this.tracksService.getAll();
    } catch (error) {
      ErrorHandler(error);
    }
  }

  @Get(':id')
  async getTrack(@Param() params: GetByIdParams): Promise<Track> {
    const { id } = params;
    try {
      return await this.tracksService.getTrack(id);
    } catch (error) {
      ErrorHandler(error);
    }
  }

  @Post()
  async createTrack(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    try {
      return await this.tracksService.create(createTrackDto);
    } catch (error) {
      ErrorHandler(error);
    }
  }

  @Put(':id')
  async updateTrackInfo(
    @Param() params: GetByIdParams,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    const { id } = params;

    try {
      return await this.tracksService.update(id, updateTrackDto);
    } catch (error) {
      ErrorHandler(error);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTrack(@Param() params: GetByIdParams): Promise<void> {
    const { id } = params;
    try {
      return await this.tracksService.deleteTrack(id);
    } catch (error) {
      ErrorHandler(error);
    }
  }
}
