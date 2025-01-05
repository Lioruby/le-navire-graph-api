import { RandomPasswordProvider } from './random-password.provider';

describe('RandomPasswordProvider', () => {
  it('should generate a random password', () => {
    const password = new RandomPasswordProvider().generate();
    const password2 = new RandomPasswordProvider().generate();
    expect(password.length).toBeGreaterThan(9);
    expect(password).not.toEqual(password2);
  });
});
