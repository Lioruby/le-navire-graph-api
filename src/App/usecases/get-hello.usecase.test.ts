import { GetHello } from './get-hello.usecase';

describe('Get Hello Usecase', () => {
  let usecase: GetHello;

  beforeEach(() => {
    usecase = new GetHello();
  });

  it('should says "Hello World!"', async () => {
    const result = await usecase.execute();
    expect(result.text).toBe('Hello World!');
  });
});
