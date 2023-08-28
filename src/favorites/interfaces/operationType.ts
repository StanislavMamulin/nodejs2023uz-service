export const SubjectType = {
  ALBUM: {
    prismaType: 'album',
    favoriteField: 'albums',
  },
  ARTIST: {
    prismaType: 'artist',
    favoriteField: 'artists',
  },
  TRACK: {
    prismaType: 'track',
    favoriteField: 'tracks',
  },
};
export type ItemType = typeof SubjectType[keyof typeof SubjectType];
