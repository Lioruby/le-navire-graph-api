import { IEncryptionProvider } from 'src/CommonCore/application/ports/encryption.provider';

export class StubEncryptionProvider implements IEncryptionProvider {
  constructor(private readonly hashedPassword: string) {}

  async hashPassword(password: string): Promise<string> {
    return this.hashedPassword;
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return password === hashedPassword;
  }
}
