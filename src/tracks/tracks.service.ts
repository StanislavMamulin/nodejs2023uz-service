import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './interfaces/track.interface';
import { TrackNotFoundError } from 'src/Errors/ServiceError';
import { DBService } from 'src/DB/DB.service';

@Injectable()
export class TracksService {
  private readonly tracksDB = this.tracksRepository.trackDB;

  constructor(private readonly tracksRepository: DBService) {}

  getAll(): Track[] {
    return this.tracksDB.getAll();
  }

  getTrack(id: string): Track {
    const track: Track | undefined = this.tracksDB.getById(id);

    if (!track) {
      throw new TrackNotFoundError();
    }

    return track;
  }

  create(createTrackDto: CreateTrackDto): Track {
    const { name, artistId, albumId, duration } = createTrackDto;

    const newTrack: Track = {
      id: uuidv4(),
      name,
      artistId,
      albumId,
      duration,
    };

    this.tracksDB.create(newTrack);

    return newTrack;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    const track: Track | undefined = this.tracksDB.update(id, updateTrackDto);

    if (!track) {
      throw new TrackNotFoundError();
    }

    return track;
  }

  deleteTrack(id: string) {
    const trackIndex: number = this.tracksDB.delete(id);

    if (trackIndex === -1) {
      throw new TrackNotFoundError();
    }
  }
}
