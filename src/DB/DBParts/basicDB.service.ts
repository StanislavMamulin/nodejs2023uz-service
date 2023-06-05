import { User } from 'src/Users/interfaces/user.interface';
import { Album } from 'src/Albums/interfaces/album.interface';
import { Artist } from 'src/artists/interfaces/artist.interface';
import { Track } from 'src/tracks/interfaces/track.interface';
import { UpdateAlbumDto } from 'src/albums/dto/update-album.dto';
import { UpdateArtistDto } from 'src/artists/dto/update-artist.dto';
import { UpdatePasswordDto } from 'src/Users/dto/update-password.dto';
import { UpdateTrackDto } from 'src/tracks/dto/update-track.dto';

type PartsType = User | Album | Artist | Track;
type DtoType =
  | UpdateAlbumDto
  | UpdateArtistDto
  | UpdatePasswordDto
  | UpdateTrackDto;

export abstract class BasicDB<T extends PartsType, D extends DtoType> {
  constructor(protected readonly dbPart: T[]) {}

  getAll() {
    return this.dbPart;
  }

  getById(id: string): T | undefined {
    return this.dbPart.find((item) => item.id === id);
  }

  create(data: T): void {
    this.dbPart.push(data);
  }

  delete(id: string): number {
    const itemIndex = this.dbPart.findIndex((item) => item.id === id);
    this.dbPart.splice(itemIndex, 1);

    return itemIndex;
  }

  abstract update(id: string, data: D): T | undefined;
}
