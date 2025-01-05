import * as dotenv from 'dotenv';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { IFixture } from '../fixtures/fixture';
import { DomainExceptionFilter } from 'src/CommonCore/infrastructure/adapters/exception-catchers/domain.exception-catcher';
import { InfrastructureExceptionFilter } from 'src/CommonCore/infrastructure/adapters/exception-catchers/infrastructure.exception-catcher';
import { InMemoryMailerGateway } from 'src/CommonCore/infrastructure/adapters/gateways/in-memory-mailer.gateway';
import { I_MAILER_GATEWAY } from 'src/CommonCore/application/ports/mailer.gateway';
import { AppModule } from 'src/App/app.module';

dotenv.config({ path: '.env.test' });

export class TestApp {
  private app: INestApplication;

  async setup() {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(I_MAILER_GATEWAY)
      .useFactory({
        factory: () => new InMemoryMailerGateway(),
      })
      .compile();

    this.app = module.createNestApplication();
    this.app.useGlobalFilters(
      new DomainExceptionFilter(),
      new InfrastructureExceptionFilter(),
    );
    await this.app.init();
  }

  async cleanup() {
    await this.app.close();
  }

  async loadFixtures(fixtures: IFixture[]) {
    return Promise.all(fixtures.map((fixture) => fixture.load(this)));
  }

  get<T>(name: any) {
    return this.app.get<T>(name);
  }

  getHttpServer() {
    return this.app.getHttpServer();
  }
}
