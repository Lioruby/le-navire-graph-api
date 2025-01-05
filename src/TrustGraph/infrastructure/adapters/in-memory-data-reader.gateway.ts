import {
  IMemberDataReaderGateway,
  MemberData,
} from 'src/TrustGraph/application/ports/member-data-reader.gateway';

export class InMemoryDataReaderGateway implements IMemberDataReaderGateway {
  async getData(): Promise<MemberData[]> {
    return [
      {
        id: 'theoaudace',
        name: 'Théo Audace',
        profilePictureUrl: null,
        scores: [
          {
            for: 'Lisamistretta',
            score: 2,
          },
          {
            for: 'lioruby_',
            score: 0,
          },
          {
            for: 'theoaudace',
            score: -1,
          },
        ],
      },
      {
        id: 'Lisamistretta',
        name: 'Lisa Mistretta',
        profilePictureUrl: null,
        scores: [
          {
            for: 'Lisamistretta',
            score: 3,
          },
          {
            for: 'lioruby_',
            score: 2,
          },
          {
            for: 'theoaudace',
            score: 1,
          },
        ],
      },
      {
        id: 'lioruby_',
        name: 'Lior Levy',
        profilePictureUrl: null,
        scores: [
          {
            for: 'Lisamistretta',
            score: 2,
          },
          {
            for: 'theoaudace',
            score: 1,
          },
          {
            for: 'lioruby_',
            score: 3,
          },
        ],
      },
    ];
  }
}
