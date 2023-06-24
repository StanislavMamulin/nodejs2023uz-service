import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interfaces/album.interface';
import { NotFoundError, NotFoundType } from '../Errors/ServiceError';
import { PrismaService } from '../prisma/prisma.service';
import { ServiceErrorsHandler } from '../Errors/ErrorHandler';

@Injectable()
export class AlbumsService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Album[]> {
    try {
      return await this.prisma.album.findMany();
    } catch (error) {
      ServiceErrorsHandler(error);
    }
  }

  async getAlbum(id: string): Promise<Album> {
    try {
      const album: Album | null = await this.prisma.album.findUnique({
        where: { id },
        include: {
          tracks: true,
          artist: true,
        },
      });

      if (!album) {
        throw new NotFoundError(NotFoundType.ALBUM);
      }

      return album;
    } catch (error) {
      ServiceErrorsHandler(error);
    }
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    try {
      const { name, year, artistId } = createAlbumDto;

      const newAlbum: Album = {
        id: uuidv4(),
        name,
        year,
        artistId,
      };

      await this.prisma.album.create({
        data: newAlbum,
      });

      return newAlbum;
    } catch (error) {
      ServiceErrorsHandler(error);
    }
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    try {
      const album: Album = await this.prisma.album.update({
        where: { id },
        data: updateAlbumDto,
      });

      return album;
    } catch (error) {
      ServiceErrorsHandler(error, NotFoundType.ALBUM);
    }
  }

  async deleteAlbum(id: string): Promise<void> {
    try {
      await this.prisma.album.delete({
        where: { id },
        include: {
          tracks: true,
        },
      });
    } catch (error) {
      ServiceErrorsHandler(error, NotFoundType.ALBUM);
    }
  }
}
