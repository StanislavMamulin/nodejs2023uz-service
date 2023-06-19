import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './interfaces/artist.interface';
import { NotFoundError, NotFoundType } from '../Errors/ServiceError';
import { DBService } from '../DB/DB.service';

@Injectable()
export class ArtistsService {
  private readonly artistsDB = this.dbService.artistsDB;
  private readonly tracksDB = this.dbService.trackDB;
  private readonly albumsDB = this.dbService.albumDB;

  constructor(private readonly dbService: DBService) {}

  getAll(): Artist[] {
    return this.artistsDB.getAll();
  }

  getArtist(id: string): Artist {
    const artist: Artist | undefined = this.artistsDB.getById(id);

    if (!artist) {
      throw new NotFoundError(NotFoundType.ARTIST);
    }

    return artist;
  }

  create(createArtistDto: CreateArtistDto): Artist {
    const { name, grammy } = createArtistDto;

    const newArtist: Artist = {
      id: uuidv4(),
      name,
      grammy,
    };

    this.artistsDB.create(newArtist);

    return newArtist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    const artist: Artist | undefined = this.artistsDB.update(
      id,
      updateArtistDto,
    );

    if (!artist) {
      throw new NotFoundError(NotFoundType.ARTIST);
    }

    return artist;
  }

  deleteArtist(id: string) {
    const artistsIndex: number = this.artistsDB.delete(id);

    if (artistsIndex === -1) {
      throw new NotFoundError(NotFoundType.ARTIST);
    }

    this.tracksDB.deleteArtistFromTracks(id);
    this.albumsDB.deleteArtistFromAlbums(id);
  }
}
