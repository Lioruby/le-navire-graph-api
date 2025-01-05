import { Entity } from 'src/CommonCore/shared/entity';
import { Link } from './link.entity';
import { Node } from './node.entity';

type Props = {
  nodes: Node[];
  links: Link[];
};

export class Graph extends Entity<Props> {}
