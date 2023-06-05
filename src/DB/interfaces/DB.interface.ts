import { Album } from 'src/Albums/interfaces/album.interface';
import { Favorites } from 'src/Favorites/interfaces/favorites.interface';
import { User } from 'src/Users/interfaces/user.interface';
import { Artist } from 'src/artists/interfaces/artist.interface';
import { Track } from 'src/tracks/interfaces/track.interface';

export class DB {
  users: User[];
  albums: Album[];
  artists: Artist[];
  tracks: Track[];
  favorites: Favorites;
}
