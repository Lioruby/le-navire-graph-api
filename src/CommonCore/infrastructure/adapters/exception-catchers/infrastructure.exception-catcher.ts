import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { InfrastructureException } from 'src/CommonCore/shared/exception';

@Catch(InfrastructureException)
export class InfrastructureExceptionFilter implements ExceptionFilter {
  catch(exception: InfrastructureException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    console.error(exception);
    response.status(exception.statusCode).json({
      statusCode: exception.statusCode,
      message: exception.message,
    });
  }
}
