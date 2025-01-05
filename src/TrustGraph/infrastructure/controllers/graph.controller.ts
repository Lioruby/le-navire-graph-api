import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetGraphQuery } from 'src/TrustGraph/application/queries/get-graph.query';

@Controller('trust-graph')
export class GraphController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('graph')
  async getGraph() {
    return this.queryBus.execute(new GetGraphQuery());
  }
}
