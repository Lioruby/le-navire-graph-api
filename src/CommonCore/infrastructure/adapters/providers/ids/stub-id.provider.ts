import { IIdProvider } from 'src/CommonCore/application/ports/id.provider';

export class StubIdProvider implements IIdProvider {
  constructor(private readonly id: string) {}

  generate(): string {
    return this.id;
  }
}
