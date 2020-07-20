import { ErrorRequestHandler } from 'express';

type ErrorName =
  | 'NOT_FOUND'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'BAD_REQUEST'
  | 'UNPROCESSABLE_ENTITY'
  | 'TOO_MANY_REQUESTS'
  | 'INTERNAL_SERVER_ERROR';

type ErrorCode = 400 | 401 | 403 | 404 | 422 | 429 |500 ;

class CustomError extends Error {
  name: ErrorName;
  code: ErrorCode;
  errors?: any[];
}

export class BadRequestException extends CustomError {
  constructor(message: string) {
    super(message);
    this.name = 'BAD_REQUEST';
    this.code = 400;
  }
}

export class UnauthorizedException extends CustomError {
  constructor(message: string) {
    super(message);
    this.name = 'UNAUTHORIZED';
    this.code = 401;
  }
}

export class ForbiddenException extends CustomError {
  constructor(message: string) {
    super(message);
    this.name = 'FORBIDDEN';
    this.code = 403;
  }
}

export class NotFoundException extends CustomError {
  constructor(message: string) {
    super(message);
    this.name = 'NOT_FOUND';
    this.code = 404;
  }
}

export class UnprocessableEntityException extends CustomError {
  constructor(message: string, errors: any[]) {
    super(message);
    this.name = 'UNPROCESSABLE_ENTITY';
    this.code = 422;
    this.errors = errors;
  }
}


export class TooManyRequestsException extends CustomError {
  constructor(message: string) {
    super(message);
    this.name = 'TOO_MANY_REQUESTS';
    this.code = 429;
  }
}
export class InternalServerErrorException extends CustomError {
  constructor(message: string) {
    super(message);
    this.name = 'INTERNAL_SERVER_ERROR';
    this.code = 500;
  }
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(err.code).json({
    success: false,
    error: {
      code: err.code,
      name: err.name,
      message: err.message,
      errors: err.errors,
    },
  });
};
