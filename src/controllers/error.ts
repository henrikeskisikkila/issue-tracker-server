import { Request, Response, NextFunction as Next } from 'express';
import StatusCodes from 'http-status-codes';

/**
 * Error handler for request handlers
 */
export const error = (err: Error, req: Request, res: Response, next: Next) => {
  console.error(err.stack);
  res.sendStatus(StatusCodes.BAD_REQUEST);
}