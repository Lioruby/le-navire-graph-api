export type MemberData = {
  id: string;
  name: string;
  profilePictureUrl: string | null;
  scores: {
    for: string;
    score: number;
  }[];
};

export const I_MEMBER_DATA_READER_GATEWAY = Symbol(
  'I_MEMBER_DATA_READER_GATEWAY',
);

export interface IMemberDataReaderGateway {
  getData(): Promise<MemberData[]>;
}
