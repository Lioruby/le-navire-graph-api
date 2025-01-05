import { IDateProvider } from 'src/CommonCore/application/ports/date.provider';

export class FixedDateProvider implements IDateProvider {
  now(): Date {
    return new Date('2023-01-01T00:00:00.000Z');
  }
}
