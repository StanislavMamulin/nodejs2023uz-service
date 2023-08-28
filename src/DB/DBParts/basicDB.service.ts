import { User } from '../../Users/interfaces/user.interface';
import { Album } from '../../Albums/interfaces/album.interface';
import { Artist } from '../../Artists/interfaces/artist.interface';
import { Track } from '../../tracks/interfaces/track.interface';
import { UpdateAlbumDto } from '../../Albums/dto/update-album.dto';
import { UpdateArtistDto } from '../../Artists/dto/update-artist.dto';
import { UpdatePasswordDto } from '../../Users/dto/update-password.dto';
import { UpdateTrackDto } from '../../tracks/dto/update-track.dto';

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
