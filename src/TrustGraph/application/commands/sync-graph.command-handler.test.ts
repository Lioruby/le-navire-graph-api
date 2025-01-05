import { InMemoryGraphRepository } from 'src/TrustGraph/infrastructure/adapters/in-memory-graph.repository';
import { IGraphRepository } from '../ports/graph.repository';
import { IMemberDataReaderGateway } from '../ports/member-data-reader.gateway';
import { SyncGraphCommand } from './sync-graph.command';
import { SyncGraphCommandHandler } from './sync-graph.command-handler';
import { InMemoryDataReaderGateway } from 'src/TrustGraph/infrastructure/adapters/in-memory-data-reader.gateway';
import { Link } from 'src/TrustGraph/domain/link.entity';
import { IGraphAlgorithmProvider } from '../ports/graph-algorithm.provider';
import { FixedGraphAlgorithmProvider } from 'src/TrustGraph/infrastructure/adapters/fixed-graph-algorithm.provider';
import { Node } from 'src/TrustGraph/domain/node.entity';

describe('SyncGraphCommandHandler', () => {
  let handler: SyncGraphCommandHandler;
  let gateway: IMemberDataReaderGateway;
  let repository: IGraphRepository;
  let algorithmProvider: IGraphAlgorithmProvider;

  beforeEach(() => {
    gateway = new InMemoryDataReaderGateway();
    repository = new InMemoryGraphRepository();
    algorithmProvider = new FixedGraphAlgorithmProvider();
    handler = new SyncGraphCommandHandler(
      gateway,
      repository,
      algorithmProvider,
    );
  });

  it('should create the correct nodes with basic properties', async () => {
    await handler.execute(new SyncGraphCommand());
    const graph = await repository.find();

    expect(graph.props.nodes).toHaveLength(3);
    expect(graph.props.nodes).toEqual([
      expect.objectContaining({
        props: expect.objectContaining({
          id: 'theoaudace',
          name: 'Théo Audace',
          profilePictureUrl: null,
        }),
      }),
      expect.objectContaining({
        props: expect.objectContaining({
          id: 'Lisamistretta',
          name: 'Lisa Mistretta',
          profilePictureUrl: null,
        }),
      }),
      expect.objectContaining({
        props: expect.objectContaining({
          id: 'lioruby_',
          name: 'Lior Levy',
          profilePictureUrl: null,
        }),
      }),
    ]);
  });

  it('should calculate the trust score for each node', async () => {
    await handler.execute(new SyncGraphCommand());
    const graph = await repository.find();
    expect(graph.props.nodes[0].props.trustScore).toBe(1);
    expect(graph.props.nodes[1].props.trustScore).toBe(7);
    expect(graph.props.nodes[2].props.trustScore).toBe(5);
  });

  describe('The link is positive between 2 users is > 1', () => {
    it('should create a link as source: lisamistretta and target: lioruby_', async () => {
      await handler.execute(new SyncGraphCommand());
      const graph = await repository.find();
      const links = graph.props.links;
      expect(links).toContainEqual(
        new Link({
          source: 'Lisamistretta',
          target: 'lioruby_',
        }),
      );
    });

    it('should not create a reverse link like source: lioruby_ and target: lisamistretta', async () => {
      await handler.execute(new SyncGraphCommand());
      const graph = await repository.find();
      const links = graph.props.links;
      expect(links).not.toContainEqual(
        new Link({
          source: 'lioruby_',
          target: 'Lisamistretta',
        }),
      );
    });
  });

  describe('One user has a positive link, the other has a <2 link', () => {
    it('should not create a link between theoaudace and lioruby_', async () => {
      await handler.execute(new SyncGraphCommand());
      const graph = await repository.find();
      const links = graph.props.links;
      expect(links).not.toContainEqual(
        new Link({
          source: 'theoaudace',
          target: 'lioruby_',
        }),
      );
    });

    it('should not create a link as source lisamistretta and target: theoaudace', async () => {
      await handler.execute(new SyncGraphCommand());
      const graph = await repository.find();
      const links = graph.props.links;
      expect(links).not.toContainEqual(
        new Link({
          source: 'Lisamistretta',
          target: 'theoaudace',
        }),
      );
    });

    it('should not create a link as source: lioruby_ and target: theoaudace', async () => {
      await handler.execute(new SyncGraphCommand());
      const graph = await repository.find();
      const links = graph.props.links;
      expect(links).not.toContainEqual(
        new Link({
          source: 'lioruby_',
          target: 'theoaudace',
        }),
      );
    });
  });

  describe('Coordinates', () => {
    it('should add coordinates to each node', async () => {
      await handler.execute(new SyncGraphCommand());
      const graph = await repository.find();
      graph.props.nodes.forEach((node) => {
        expect(node.props.coordinates).toEqual({
          x: 100,
          y: 100,
        });
      });
    });
  });
});
