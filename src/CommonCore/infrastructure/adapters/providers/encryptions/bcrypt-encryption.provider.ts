import { IEncryptionProvider } from 'src/CommonCore/application/ports/encryption.provider';
import * as bcrypt from 'bcrypt';

export class BcryptEncryptionProvider implements IEncryptionProvider {
  constructor(private readonly saltRounds: number = 10) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
