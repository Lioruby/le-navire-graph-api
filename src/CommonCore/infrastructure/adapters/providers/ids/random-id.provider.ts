import { v4 as uuidv4 } from 'uuid';
import { IIdProvider } from 'src/CommonCore/application/ports/id.provider';

export class RandomIdProvider implements IIdProvider {
  generate(): string {
    return uuidv4();
  }
}
