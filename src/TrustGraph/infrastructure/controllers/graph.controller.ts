import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetGraphQuery } from 'src/TrustGraph/application/queries/get-graph.query';

@Controller('graph')
export class GraphController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async getGraph() {
    return this.queryBus.execute(new GetGraphQuery());
  }
}
