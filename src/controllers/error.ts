import { Request, Response, NextFunction as Next } from 'express';
// import StatusCodes from 'http-status-codes';

const error = (err: Error, req: Request, res: Response, next: Next) => {
  console.error(err.stack);
  next(err);
  // res.sendStatus(StatusCodes.BAD_REQUEST);
}

export default error;