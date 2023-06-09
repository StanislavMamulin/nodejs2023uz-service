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
  getAllTracks() {
    try {
      return this.tracksService.getAll();
    } catch (error) {
      ErrorHandler(error);
    }
  }

  @Get(':id')
  getTrack(@Param() params: GetByIdParams) {
    const { id } = params;
    try {
      return this.tracksService.getTrack(id);
    } catch (error) {
      ErrorHandler(error);
    }
  }

  @Post()
  createTrack(@Body() createTrackDto: CreateTrackDto): Track {
    try {
      return this.tracksService.create(createTrackDto);
    } catch (error) {
      ErrorHandler(error);
    }
  }

  @Put(':id')
  updateTrackInfo(
    @Param() params: GetByIdParams,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const { id } = params;

    try {
      return this.tracksService.update(id, updateTrackDto);
    } catch (error) {
      ErrorHandler(error);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param() params: GetByIdParams) {
    const { id } = params;
    try {
      return this.tracksService.deleteTrack(id);
    } catch (error) {
      ErrorHandler(error);
    }
  }
}
