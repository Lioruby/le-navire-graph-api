import { DomainException } from 'src/CommonCore/shared/exception';

export class InvalidEmailException extends DomainException {
  constructor() {
    super('INVALID_EMAIL');
  }
}
