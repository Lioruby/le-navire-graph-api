import { Graph } from 'src/TrustGraph/domain/graph.entity';

export const I_GRAPH_ALGORITHM_PROVIDER = Symbol('I_GRAPH_ALGORITHM_PROVIDER');

export interface IGraphAlgorithmProvider {
  calculateCoordinates(graph: Graph): Promise<void>;
}
