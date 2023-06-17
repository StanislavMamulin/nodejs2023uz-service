import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './interfaces/artist.interface';
import { NotFoundError, NotFoundType } from '../Errors/ServiceError';
import { PrismaService } from '../prisma/prisma.service';
import { ServiceErrorsHandler } from '../Errors/ErrorHandler';

@Injectable()
export class ArtistsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Artist[]> {
    try {
      return await this.prisma.artist.findMany();
    } catch (error) {
      ServiceErrorsHandler(error);
    }
  }

  async getArtist(id: string): Promise<Artist> {
    try {
      const artist: Artist | null = await this.prisma.artist.findUnique({
        where: { id },
      });

      if (!artist) {
        throw new NotFoundError(NotFoundType.ARTIST);
      }

      return artist;
    } catch (error) {
      ServiceErrorsHandler(error);
    }
  }

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    try {
      const { name, grammy } = createArtistDto;

      const newArtist: Artist = {
        id: uuidv4(),
        name,
        grammy,
      };

      await this.prisma.artist.create({
        data: newArtist,
      });

      return newArtist;
    } catch (error) {
      ServiceErrorsHandler(error);
    }
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    try {
      const artist: Artist = await this.prisma.artist.update({
        where: { id },
        data: updateArtistDto,
      });

      if (!artist) {
        throw new NotFoundError(NotFoundType.ARTIST);
      }

      return artist;
    } catch (error) {
      ServiceErrorsHandler(error, NotFoundType.ARTIST);
    }
  }

  async deleteArtist(id: string): Promise<void> {
    try {
      await this.prisma.artist.delete({
        where: { id },
      });

      await this.prisma.track.deleteMany({
        where: { artistId: id },
      });

      await this.prisma.album.deleteMany({
        where: { artistId: id },
      });
    } catch (error) {
      ServiceErrorsHandler(error, NotFoundType.ARTIST);
    }
  }
}
