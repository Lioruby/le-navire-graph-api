import { HttpStatus } from '@nestjs/common';

export class DomainException extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number = HttpStatus.BAD_REQUEST,
  ) {
    super(message);
  }
}

export class InfrastructureException extends Error {
  constructor(
    public readonly message: string = '',
    public readonly statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super(message);
  }
}
