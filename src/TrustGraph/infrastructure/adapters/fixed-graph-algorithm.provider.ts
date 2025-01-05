import { IGraphAlgorithmProvider } from 'src/TrustGraph/application/ports/graph-algorithm.provider';
import { Graph } from 'src/TrustGraph/domain/graph.entity';

export class FixedGraphAlgorithmProvider implements IGraphAlgorithmProvider {
  async calculateCoordinates(graph: Graph): Promise<void> {
    graph.props.nodes.forEach((node) => {
      node.update({
        coordinates: {
          x: 100,
          y: 100,
        },
      });
    });
  }
}
