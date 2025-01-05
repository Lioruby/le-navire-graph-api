import { IGraphRepository } from 'src/TrustGraph/application/ports/graph.repository';
import { Graph } from 'src/TrustGraph/domain/graph.entity';
import { Link } from 'src/TrustGraph/domain/link.entity';
import { Node } from 'src/TrustGraph/domain/node.entity';

export class InMemoryGraphRepository implements IGraphRepository {
  private graph: Graph = new Graph({
    nodes: [],
    links: [],
  });

  async find(): Promise<Graph> {
    return this.graph;
  }

  async updateNodes(nodes: Node[]): Promise<void> {
    this.graph.update({
      nodes,
    });
  }

  async updateLinks(links: Link[]): Promise<void> {
    this.graph.update({
      links,
    });
  }
}
