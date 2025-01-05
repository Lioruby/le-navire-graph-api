export const I_ENCRYPTION_PROVIDER = Symbol('IEncryptionProvider');

export interface IEncryptionProvider {
  hashPassword(password: string): Promise<string>;
  comparePassword(password: string, hashedPassword: string): Promise<boolean>;
}
