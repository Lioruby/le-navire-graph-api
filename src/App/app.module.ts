import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { GetHello } from './usecases/get-hello.usecase';
import { CommonCoreModule } from 'src/CommonCore/infrastructure/modules/common-core.module';

@Module({
  imports: [CommonCoreModule],
  controllers: [AppController],
  providers: [
    {
      provide: GetHello,
      useClass: GetHello,
    },
  ],
})
export class AppModule {}
