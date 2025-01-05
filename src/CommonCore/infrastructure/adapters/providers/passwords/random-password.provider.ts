import { IPasswordProvider } from 'src/CommonCore/application/ports/password.provider';

export class RandomPasswordProvider implements IPasswordProvider {
  generate(): string {
    return this.generateRandomPassword();
  }

  private generateRandomPassword(): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    return password;
  }
}
