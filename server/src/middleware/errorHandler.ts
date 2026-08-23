import type { ErrorRequestHandler, RequestHandler } from 'express';
import { ZodError } from 'zod';

export class HttpError extends Error {
  constructor(public status: number, message: string, public details: unknown[] = []) {
    super(message);
  }
}

export const notFoundHandler: RequestHandler = (_req, _res, next) => {
  next(new HttpError(404, 'Route not found'));
};

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof ZodError) {
    return res.status(400).json({
      error: { message: 'Validation failed', details: error.issues }
    });
  }

  if (error instanceof HttpError) {
    return res.status(error.status).json({
      error: { message: error.message, details: error.details }
    });
  }

  console.error(error);
  return res.status(500).json({
    error: { message: 'Internal server error', details: [] }
  });
};
