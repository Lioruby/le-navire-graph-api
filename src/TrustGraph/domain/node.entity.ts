import { Entity } from 'src/CommonCore/shared/entity';

type Props = {
  id: string;
  name: string;
  profilePictureUrl: string | null;
  trustScore: number;
  coordinates?: {
    x: number;
    y: number;
  };
};

export class Node extends Entity<Props> {
  constructor(props: Props) {
    super(props);
  }
}
