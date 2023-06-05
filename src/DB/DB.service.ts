import { Injectable } from '@nestjs/common';
import { DB } from './interfaces/DB.interface';

import { TrackDB } from './DBParts/trackDB.service';
import { ArtistDB } from './DBParts/artistDB.service';
import { AlbumDB } from './DBParts/albumDB.service';
import { UserDB } from './DBParts/userDB.service';

const initDB: DB = {
  users: [],
  artists: [],
  albums: [],
  tracks: [],
  favorites: {
    artists: [],
    albums: [],
    tracks: [],
  },
};

@Injectable()
export class DBService {
  private readonly db: DB = initDB;

  trackDB = new TrackDB(this.db.tracks);
  artistsDB = new ArtistDB(this.db.artists);
  albumDB = new AlbumDB(this.db.albums);
  userDB = new UserDB(this.db.users);
}
