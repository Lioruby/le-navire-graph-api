import { Module } from '@nestjs/common';
import { SyncGraphTask } from '../tasks/sync-graph.task';
import { CqrsModule } from '@nestjs/cqrs';
import { InMemoryGraphRepository } from '../adapters/in-memory-graph.repository';
import {
  I_GRAPH_REPOSITORY,
  IGraphRepository,
} from 'src/TrustGraph/application/ports/graph.repository';
import { GSheetMemberDataReaderGateway } from '../adapters/g-sheet-member-data-reader.gateway';
import {
  I_MEMBER_DATA_READER_GATEWAY,
  IMemberDataReaderGateway,
} from 'src/TrustGraph/application/ports/member-data-reader.gateway';
import { SyncGraphCommandHandler } from 'src/TrustGraph/application/commands/sync-graph.command-handler';
import { GraphController } from '../controllers/graph.controller';
import { GetGraphQueryHandler } from 'src/TrustGraph/application/queries/get-graph.query-handler';
import { ConfigService } from '@nestjs/config';
import { TSNEGraphAlgorithmProvider } from '../adapters/t-sne-graph-algorithm.provider';
import {
  I_GRAPH_ALGORITHM_PROVIDER,
  IGraphAlgorithmProvider,
} from 'src/TrustGraph/application/ports/graph-algorithm.provider';
import { CommonCoreModule } from 'src/CommonCore/infrastructure/modules/common-core.module';

@Module({
  imports: [CqrsModule, CommonCoreModule],
  controllers: [GraphController],
  providers: [
    SyncGraphTask,
    {
      provide: I_GRAPH_REPOSITORY,
      useClass: InMemoryGraphRepository,
    },
    {
      provide: I_MEMBER_DATA_READER_GATEWAY,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        new GSheetMemberDataReaderGateway(configService),
    },
    {
      provide: I_GRAPH_ALGORITHM_PROVIDER,
      useClass: TSNEGraphAlgorithmProvider,
    },
    {
      provide: SyncGraphCommandHandler,
      inject: [
        I_MEMBER_DATA_READER_GATEWAY,
        I_GRAPH_REPOSITORY,
        I_GRAPH_ALGORITHM_PROVIDER,
      ],
      useFactory: (
        memberDataReaderGateway: IMemberDataReaderGateway,
        graphRepository: IGraphRepository,
        graphAlgorithmProvider: IGraphAlgorithmProvider,
      ) =>
        new SyncGraphCommandHandler(
          memberDataReaderGateway,
          graphRepository,
          graphAlgorithmProvider,
        ),
    },
    {
      provide: GetGraphQueryHandler,
      inject: [I_GRAPH_REPOSITORY],
      useFactory: (graphRepository: IGraphRepository) =>
        new GetGraphQueryHandler(graphRepository),
    },
  ],
})
export class TrustGraphModule {}
