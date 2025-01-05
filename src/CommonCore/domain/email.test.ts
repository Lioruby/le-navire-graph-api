import { Email } from './email';
import { InvalidEmailException } from './exceptions/invalid-email.exception';

describe('Email', () => {
  it('should be valid', () => {
    const email = new Email('test@test.com');
    expect(email).toBeDefined();
  });

  it('should be invalid', () => {
    expect(() => new Email('invalid-email')).toThrow(InvalidEmailException);
  });
});
