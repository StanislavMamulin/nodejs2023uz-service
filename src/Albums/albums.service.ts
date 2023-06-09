import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DBService } from '../DB/DB.service';
import { Album } from './interfaces/album.interface';
import { NotFoundError, NotFoundType } from '../Errors/ServiceError';

@Injectable()
export class AlbumsService {
  private readonly albumDB = this.dbService.albumDB;
  private readonly trackDB = this.dbService.trackDB;

  constructor(private dbService: DBService) {}

  getAll(): Album[] {
    return this.albumDB.getAll();
  }

  getAlbum(id: string): Album {
    const album: Album | undefined = this.albumDB.getById(id);

    if (!album) {
      throw new NotFoundError(NotFoundType.ALBUM);
    }

    return album;
  }

  create(createAlbumDto: CreateAlbumDto): Album {
    const { name, year, artistId } = createAlbumDto;

    const newAlbum: Album = {
      id: uuidv4(),
      name,
      year,
      artistId,
    };

    this.albumDB.create(newAlbum);

    return newAlbum;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    const album: Album | undefined = this.albumDB.update(id, updateAlbumDto);

    if (!album) {
      throw new NotFoundError(NotFoundType.ALBUM);
    }

    return album;
  }

  deleteAlbum(id: string) {
    const albumIndex: number = this.albumDB.delete(id);

    if (albumIndex === -1) {
      throw new NotFoundError(NotFoundType.ALBUM);
    }

    this.trackDB.deleteAlbumFromTracks(id);
  }
}
