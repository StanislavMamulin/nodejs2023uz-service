import { Album } from '../../albums/interfaces/album.interface';
import { User } from '../../Users/interfaces/user.interface';
import { Artist } from '../../artists/interfaces/artist.interface';
import { Track } from '../../tracks/interfaces/track.interface';

export class DB {
  users: User[];
  albums: Album[];
  artists: Artist[];
  tracks: Track[];
}
