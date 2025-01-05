import { IGraphAlgorithmProvider } from 'src/TrustGraph/application/ports/graph-algorithm.provider';
import { Graph as GraphEntity } from 'src/TrustGraph/domain/graph.entity';
// @ts-expect-error - graphology types are not properly resolved
import { Graph } from 'graphology';
import { Node } from 'src/TrustGraph/domain/node.entity';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const TSNE = require('tsne-js');

export class TSNEGraphAlgorithmProvider implements IGraphAlgorithmProvider {
  async calculateCoordinates(graph: GraphEntity): Promise<void> {
    const G = new Graph({ type: 'undirected' });
    graph.props.nodes.forEach((node) => {
      G.addNode(node.props.id);
    });
    graph.props.links.forEach((link) => {
      G.addUndirectedEdge(link.props.source, link.props.target);
    });
    // 4. Build the "feature matrix" for t-SNE
    //    Ex.: use raw adjacency (0/1) as vector
    //    => NxN dimension if you have N nodes
    const nodeIds = graph.props.nodes.map((n) => n.props.id);
    const N = nodeIds.length;

    // Create an N x N matrix of 0/1, M[i][j] = 1 if link(i,j), else 0
    const adjacencyMatrix: number[][] = new Array(N)
      .fill(null)
      .map(() => new Array(N).fill(0));

    nodeIds.forEach((idA, i) => {
      nodeIds.forEach((idB, j) => {
        // Test if i is connected to j
        if (G.hasEdge(idA, idB)) {
          adjacencyMatrix[i][j] = 1;
        } else {
          adjacencyMatrix[i][j] = 0;
        }
      });
    });

    // 5. Run t-SNE to reduce NxN -> 2D
    const model = new TSNE({
      dim: 2,
      perplexity: 20,
      earlyExaggeration: 4.0,
      learningRate: 100.0,
      nIter: 500,
      metric: 'euclidean',
    });

    model.init({
      data: adjacencyMatrix, // NxN matrix
      type: 'dense',
    });

    model.run();
    // getOutputScaled() returns an array of N points [x, y]
    // normalized approximately in [-1,1] or [0,1] depending on version
    const tsneResults = model.getOutputScaled();

    // 6. Associate t-SNE coordinates to each node
    graph.props.nodes.forEach((node: Node, i: number) => {
      node.update({
        coordinates: {
          x: tsneResults[i][0],
          y: tsneResults[i][1],
        },
      });
    });
  }
}
