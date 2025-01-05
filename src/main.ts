import { NestFactory } from '@nestjs/core';
import { AppModule } from './App/app.module';
import { Logger } from '@nestjs/common';
import { DomainExceptionFilter } from './CommonCore/infrastructure/adapters/exception-catchers/domain.exception-catcher';
import { InfrastructureExceptionFilter } from './CommonCore/infrastructure/adapters/exception-catchers/infrastructure.exception-catcher';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(new Logger('HTTP', { timestamp: true }));

  app.enableCors();

  app.useGlobalFilters(
    new DomainExceptionFilter(),
    new InfrastructureExceptionFilter(),
  );

  await app.listen(process.env.PORT || 8000);
}

bootstrap();
