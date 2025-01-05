import { capitalize } from './capitalize.utils';

export const extractNamesFromEmail = (
  email: string,
): { firstName: string; lastName: string } => {
  const [localPart] = email.split('@');
  const nameParts = localPart.split(/[.-]/);

  if (nameParts.length === 1) {
    return {
      firstName: capitalize(nameParts[0]),
      lastName: '',
    };
  }

  const [firstName, lastName] = nameParts;
  return {
    firstName: capitalize(firstName),
    lastName: capitalize(lastName),
  };
};
