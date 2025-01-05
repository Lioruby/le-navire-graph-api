import { Executable } from 'src/CommonCore/shared/executable';

type Request = void;
type Response = {
  text: string;
};

export class GetHello implements Executable<Request, Response> {
  async execute() {
    return {
      text: 'Hello World!',
    };
  }
}
