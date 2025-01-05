import { Module } from '@nestjs/common';

import { I_DATE_PROVIDER } from 'src/CommonCore/application/ports/date.provider';
import { CurrentDateProvider } from 'src/CommonCore/infrastructure/adapters/providers/dates/current-date.provider';
import { I_ID_PROVIDER } from 'src/CommonCore/application/ports/id.provider';
import { RandomIdProvider } from 'src/CommonCore/infrastructure/adapters/providers/ids/random-id.provider';
import { I_MAILER_GATEWAY } from 'src/CommonCore/application/ports/mailer.gateway';
import { I_PASSWORD_PROVIDER } from 'src/CommonCore/application/ports/password.provider';
import { RandomPasswordProvider } from 'src/CommonCore/infrastructure/adapters/providers/passwords/random-password.provider';
import { I_ENCRYPTION_PROVIDER } from 'src/CommonCore/application/ports/encryption.provider';
import { BcryptEncryptionProvider } from 'src/CommonCore/infrastructure/adapters/providers/encryptions/bcrypt-encryption.provider';
import { I_CLOUD_STORAGE_SERVICE } from 'src/CommonCore/application/ports/cloud-storage.service';
import { FakeCloudStorageService } from '../adapters/services/fake-cloud-storage.service';
import { InMemoryMailerGateway } from '../adapters/gateways/in-memory-mailer.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: I_DATE_PROVIDER,
      useClass: CurrentDateProvider,
    },
    {
      provide: I_ID_PROVIDER,
      useClass: RandomIdProvider,
    },
    {
      provide: I_MAILER_GATEWAY,
      useClass: InMemoryMailerGateway,
    },
    {
      provide: I_PASSWORD_PROVIDER,
      useClass: RandomPasswordProvider,
    },
    {
      provide: I_ENCRYPTION_PROVIDER,
      useClass: BcryptEncryptionProvider,
    },
    {
      provide: I_CLOUD_STORAGE_SERVICE,
      useClass: FakeCloudStorageService,
    },
  ],
  exports: [
    I_DATE_PROVIDER,
    I_ID_PROVIDER,
    I_MAILER_GATEWAY,
    I_PASSWORD_PROVIDER,
    I_ENCRYPTION_PROVIDER,
    I_CLOUD_STORAGE_SERVICE,
  ],
})
export class CommonCoreModule {}
