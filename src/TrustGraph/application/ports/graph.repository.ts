import { Graph } from 'src/TrustGraph/domain/graph.entity';
import { Link } from 'src/TrustGraph/domain/link.entity';
import { Node } from 'src/TrustGraph/domain/node.entity';

export const I_GRAPH_REPOSITORY = Symbol('I_GRAPH_REPOSITORY');

export interface IGraphRepository {
  find(): Promise<Graph>;
  updateNodes(nodes: Node[]): Promise<void>;
  updateLinks(links: Link[]): Promise<void>;
}
