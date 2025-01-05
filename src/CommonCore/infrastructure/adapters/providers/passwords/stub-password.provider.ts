import { IPasswordProvider } from 'src/CommonCore/application/ports/password.provider';

export class StubPasswordProvider implements IPasswordProvider {
  constructor(private readonly password: string) {}
  generate(): string {
    return this.password;
  }
}
