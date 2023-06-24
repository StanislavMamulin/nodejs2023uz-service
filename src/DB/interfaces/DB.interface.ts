import { Album } from '../../Albums/interfaces/album.interface';
import { User } from '../../Users/interfaces/user.interface';
import { Artist } from '../../Artists/interfaces/artist.interface';
import { Track } from '../../tracks/interfaces/track.interface';

export class DB {
  users: User[];
  albums: Album[];
  artists: Artist[];
  tracks: Track[];
}
