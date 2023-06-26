import { Album } from '../../Albums/interfaces/album.interface';
import { Artist } from '../../Artists/interfaces/artist.interface';
import { Track } from '../../tracks/interfaces/track.interface';

export class FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
