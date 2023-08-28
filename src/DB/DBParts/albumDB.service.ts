import { Album } from 'src/Albums/interfaces/album.interface';
import { BasicDB } from './basicDB.service';
import { UpdateAlbumDto } from 'src/albums/dto/update-album.dto';

export class AlbumDB extends BasicDB<Album, UpdateAlbumDto> {
  update(id: string, data: UpdateAlbumDto): Album | undefined {
    const { name, year, artistId } = data;

    const album: Album | undefined = this.getById(id);

    if (!album) {
      return;
    }

    album.name = name || album.name;
    album.year = year || album.year;
    album.artistId = artistId || album.artistId;

    return album;
  }

  deleteArtistFromAlbums(artistId: string): void {
    this.dbPart.forEach((album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
  }
}
