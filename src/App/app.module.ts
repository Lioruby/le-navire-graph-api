import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CommonCoreModule } from 'src/CommonCore/infrastructure/modules/common-core.module';
import { TrustGraphModule } from 'src/TrustGraph/infrastructure/modules/trust-graph.module';

@Module({
  imports: [
    CommonCoreModule,
    TrustGraphModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
