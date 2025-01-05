import * as request from 'supertest';
import { TestApp } from 'src/CommonCore/testing/utils/test-app.utils';

describe('Feature: Get Hello', () => {
  let app: TestApp;

  beforeEach(async () => {
    app = new TestApp();
    await app.setup();
  });

  afterEach(async () => {
    await app.cleanup();
  });

  it('should return "Hello World!"', async () => {
    const result = await request(app.getHttpServer()).get('/app/get-hello');
    expect(result.body.text).toBe('Hello World!');
  });
});
