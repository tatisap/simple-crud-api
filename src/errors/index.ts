import { STATUS_CODE } from '../constants/status.code';

export class HttpError extends Error {
  constructor(public readonly statusCode: STATUS_CODE, message: string) {
    super(message);
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string) {
    super(STATUS_CODE.BAD_REQUEST, message);
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string) {
    super(STATUS_CODE.NOT_FOUND, message);
  }
}

export const isHttpError = (error: unknown): error is HttpError => error instanceof HttpError;
