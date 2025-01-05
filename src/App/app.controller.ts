import { Controller, Get } from '@nestjs/common';
import { GetHello } from './usecases/get-hello.usecase';
import { AppAPI } from './app.contract';

@Controller('app')
export class AppController {
  constructor(private readonly getHello: GetHello) {}

  @Get('get-hello')
  async handleGetHello(): Promise<AppAPI.GetHello.Response> {
    return await this.getHello.execute();
  }
}
