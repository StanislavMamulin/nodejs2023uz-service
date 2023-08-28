import { UpdateArtistDto } from '../../artists/dto/update-artist.dto';
import { BasicDB } from './basicDB.service';
import { Artist } from '../../artists/interfaces/artist.interface';

export class ArtistDB extends BasicDB<Artist, UpdateArtistDto> {
  update(id: string, data: UpdateArtistDto): Artist | undefined {
    const { name, grammy } = data;

    const artist: Artist | undefined = this.getById(id);

    if (!artist) {
      return;
    }

    artist.name = name || artist.name;
    artist.grammy = grammy !== undefined ? grammy : artist.grammy;

    return artist;
  }
}
