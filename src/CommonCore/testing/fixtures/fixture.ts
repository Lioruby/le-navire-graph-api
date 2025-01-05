import { TestApp } from '../utils/test-app.utils';

export interface IFixture {
  load(app: TestApp): Promise<void>;
}
