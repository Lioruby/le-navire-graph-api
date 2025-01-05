import { ValueObject } from 'src/CommonCore/shared/value-object';
import { InvalidEmailException } from './exceptions/invalid-email.exception';

export class Email extends ValueObject<string> {
  constructor(value: string) {
    super(value);

    if (!this.isValid(value)) {
      throw new InvalidEmailException();
    }
  }

  private isValid(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
}
