import { UpdateTrackDto } from '../../tracks/dto/update-track.dto';
import { Track } from '../../tracks/interfaces/track.interface';
import { BasicDB } from './basicDB.service';

export class TrackDB extends BasicDB<Track, UpdateTrackDto> {
  update(id: string, data: UpdateTrackDto): Track | undefined {
    const { name, artistId, albumId, duration } = data;

    const track = this.getById(id);

    if (!track) {
      return;
    }

    track.name = name || track.name;
    track.duration = duration || track.duration;
    track.artistId = artistId || track.artistId;
    track.albumId = albumId || track.albumId;

    return track;
  }

  deleteArtistFromTracks(artistId: string): void {
    this.dbPart.forEach((track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });
  }

  deleteAlbumFromTracks(albumId: string): void {
    this.dbPart.forEach((track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });
  }
}
