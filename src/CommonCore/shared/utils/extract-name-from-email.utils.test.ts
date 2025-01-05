import { extractNamesFromEmail } from './extract-name-from-email.utils';

describe('Extract name from email', () => {
  it('should extract name from email', () => {
    const email = 'john.doe@example.com';
    const name = extractNamesFromEmail(email);
    expect(name).toEqual({ firstName: 'John', lastName: 'Doe' });
  });

  it('should extract name from email with dot', () => {
    const email = 'john@example.com';
    const name = extractNamesFromEmail(email);
    expect(name).toEqual({ firstName: 'John', lastName: '' });
  });

  it('should extract 2 names if there are -', () => {
    const email = 'john-doe@example.com';
    const name = extractNamesFromEmail(email);
    expect(name).toEqual({ firstName: 'John', lastName: 'Doe' });
  });

  it('should extract 2 names if there are -', () => {
    const email = 'levy.lior.pro@gmail.com';
    const name = extractNamesFromEmail(email);
    expect(name).toEqual({ firstName: 'Levy', lastName: 'Lior' });
  });
});
