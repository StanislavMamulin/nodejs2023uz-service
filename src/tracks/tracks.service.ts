import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './interfaces/track.interface';
import { TrackNotFoundError } from 'src/Errors/ServiceError';

@Injectable()
export class TracksService {
  private readonly tracks: Track[] = [];

  getAll(): Track[] {
    return this.tracks;
  }

  getTrack(id: string): Track {
    const track: Track | undefined = this.tracks.find(
      (track) => track.id === id,
    );

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

    this.tracks.push(newTrack);

    return newTrack;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    const { name, artistId, albumId, duration } = updateTrackDto;

    const track: Track | undefined = this.tracks.find(
      (track) => track.id === id,
    );

    if (!track) {
      throw new TrackNotFoundError();
    }

    track.name = name;
    track.artistId = artistId;
    track.albumId = albumId;
    track.duration = duration;

    return track;
  }

  deleteTrack(id: string) {
    const trackIndex: number = this.tracks.findIndex(
      (track) => track.id === id,
    );
    if (trackIndex === -1) {
      throw new TrackNotFoundError();
    }

    this.tracks.splice(trackIndex, 1);
  }
}
