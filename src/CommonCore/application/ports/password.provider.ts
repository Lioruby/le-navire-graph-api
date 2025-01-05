export const I_PASSWORD_PROVIDER = Symbol('I_PASSWORD_PROVIDER');

export interface IPasswordProvider {
  generate(): string;
}
