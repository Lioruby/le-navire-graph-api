import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SyncGraphCommand } from './sync-graph.command';
import {
  IMemberDataReaderGateway,
  MemberData,
} from '../ports/member-data-reader.gateway';
import { IGraphRepository } from '../ports/graph.repository';
import { Node } from 'src/TrustGraph/domain/node.entity';
import { Link } from 'src/TrustGraph/domain/link.entity';
import { IGraphAlgorithmProvider } from '../ports/graph-algorithm.provider';
import { Graph } from 'src/TrustGraph/domain/graph.entity';

@CommandHandler(SyncGraphCommand)
export class SyncGraphCommandHandler
  implements ICommandHandler<SyncGraphCommand, void>
{
  private readonly MIN_SCORE_TO_CREATE_LINK = 2;

  constructor(
    private readonly memberDataReaderGateway: IMemberDataReaderGateway,
    private readonly graphRepository: IGraphRepository,
    private readonly algorithmProvider: IGraphAlgorithmProvider,
  ) {}

  async execute(command: SyncGraphCommand): Promise<void> {
    const rowData = await this.memberDataReaderGateway.getData();

    const nodes = this.createNodes(rowData);

    const { links, trustScores } = this.createLinksAndTrustScores(rowData);

    this.updateNodeTrustScores(nodes, trustScores);

    const graph = new Graph({
      nodes: nodes,
      links: links,
    });

    await this.assignCoordinates(graph);
    await this.updateGraph(graph);
  }

  private createNodes(rowData: any[]): Node[] {
    return rowData.map(
      (member) =>
        new Node({
          id: member.id,
          name: member.name,
          profilePictureUrl: member.profilePictureUrl,
          trustScore: 0,
        }),
    );
  }

  private createLinksAndTrustScores(rowData: MemberData[]): {
    links: Link[];
    trustScores: Map<string, number>;
  } {
    const scoreMap = new Map(
      rowData.map((member) => [
        member.id,
        new Map(member.scores.map((score) => [score.for, score.score])),
      ]),
    );

    const processedLinks = new Set<string>();
    const trustScores = new Map<string, number>();

    const links: Link[] = [];

    rowData.forEach((member) => {
      member.scores.forEach((score) => {
        const forwardScore = score.score;
        const reverseScore = scoreMap?.get(score.for)?.get(member.id);

        trustScores.set(
          score.for,
          (trustScores.get(score.for) ?? 0) + (forwardScore ?? 0),
        );

        const linkKey = [member.id, score.for].sort().join('->');

        if (processedLinks.has(linkKey)) {
          return;
        }

        if (!this.shouldCreateLink(forwardScore, Number(reverseScore))) {
          return;
        }

        processedLinks.add(linkKey);

        links.push(
          new Link({
            source: member.id,
            target: score.for,
          }),
        );
      });
    });

    return { links, trustScores };
  }

  private updateNodeTrustScores(
    nodes: Node[],
    trustScoreMap: Map<string, number>,
  ): void {
    nodes.forEach((node) => {
      node.update({
        trustScore: trustScoreMap.get(node.props.id) ?? 0,
      });
    });
  }

  private async assignCoordinates(graph: Graph): Promise<void> {
    await this.algorithmProvider.calculateCoordinates(graph);
  }

  private async updateGraph(graph: Graph): Promise<void> {
    await this.graphRepository.updateNodes(graph.props.nodes);
    await this.graphRepository.updateLinks(graph.props.links);
  }

  private shouldCreateLink(
    forwardScore: number,
    reverseScore: number,
  ): boolean {
    return (
      forwardScore >= this.MIN_SCORE_TO_CREATE_LINK &&
      reverseScore >= this.MIN_SCORE_TO_CREATE_LINK
    );
  }
}
