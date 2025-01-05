import { IGraphRepository } from '../ports/graph.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetGraphQuery } from './get-graph.query';

type Response = {
  nodes: { id: string; name: string }[];
  links: { source: string; target: string }[];
};

@QueryHandler(GetGraphQuery)
export class GetGraphQueryHandler
  implements IQueryHandler<GetGraphQuery, Response>
{
  constructor(private readonly graphRepository: IGraphRepository) {}

  async execute(query: GetGraphQuery): Promise<Response> {
    const graph = await this.graphRepository.find();
    return {
      nodes: graph.props.nodes.map((node) => node.props),
      links: graph.props.links.map((link) => link.props),
    };
  }
}
