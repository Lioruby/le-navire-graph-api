import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Cron } from '@nestjs/schedule';
import { CronExpression } from '@nestjs/schedule';
import { SyncGraphCommand } from 'src/TrustGraph/application/commands/sync-graph.command';

@Injectable()
export class SyncGraphTask {
  constructor(private readonly commandBus: CommandBus) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  async handle() {
    await this.commandBus.execute(new SyncGraphCommand());
  }
}
