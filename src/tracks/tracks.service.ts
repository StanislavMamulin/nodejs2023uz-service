import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './interfaces/track.interface';
import { NotFoundError, NotFoundType } from '../Errors/ServiceError';
import { PrismaService } from '../prisma/prisma.service';
import { ServiceErrorsHandler } from '../Errors/ErrorHandler';

@Injectable()
export class TracksService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Track[]> {
    try {
      return await this.prisma.track.findMany();
    } catch (error) {
      ServiceErrorsHandler(error);
    }
  }

  async getTrack(id: string): Promise<Track> {
    try {
      const track: Track | null = await this.prisma.track.findUnique({
        where: { id },
      });

      if (!track) {
        throw new NotFoundError(NotFoundType.TRACK);
      }

      return track;
    } catch (error) {
      ServiceErrorsHandler(error);
    }
  }

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    try {
      const { name, artistId, albumId, duration } = createTrackDto;

      const newTrack: Track = {
        id: uuidv4(),
        name,
        artistId,
        albumId,
        duration,
      };

      await this.prisma.track.create({
        data: newTrack,
      });

      return newTrack;
    } catch (error) {
      ServiceErrorsHandler(error);
    }
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    try {
      const track: Track = await this.prisma.track.update({
        where: { id },
        data: updateTrackDto,
      });

      return track;
    } catch (error) {
      ServiceErrorsHandler(error, NotFoundType.TRACK);
    }
  }

  async deleteTrack(id: string): Promise<void> {
    try {
      await this.prisma.track.delete({
        where: { id },
      });
    } catch (error) {
      ServiceErrorsHandler(error, NotFoundType.TRACK);
    }
  }
}
