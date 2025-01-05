import * as request from 'supertest';
import { TestApp } from 'src/CommonCore/testing/utils/test-app.utils';

describe('Feature: Get Clients Activity', () => {
  let app: TestApp;

  beforeEach(async () => {
    app = new TestApp();
    await app.setup();
  });

  afterEach(async () => {
    await app.cleanup();
  });

  it('should get clients activity', async () => {
    const result = await request(app.getHttpServer()).get('/trust-graph/graph');

    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      nodes: [],
      links: [],
    });
  });
});
