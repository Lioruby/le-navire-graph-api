import { Entity } from 'src/CommonCore/shared/entity';

type Props = {
  source: string;
  target: string;
};

export class Link extends Entity<Props> {}
