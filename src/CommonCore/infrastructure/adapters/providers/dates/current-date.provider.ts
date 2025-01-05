import { IDateProvider } from 'src/CommonCore/application/ports/date.provider';

export class CurrentDateProvider implements IDateProvider {
  now(): Date {
    return new Date();
  }
}
