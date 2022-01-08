import { Request, Response, NextFunction as Next } from 'express';
import { check, validationResult } from 'express-validator';
import passport from 'passport';
import { IVerifyOptions } from 'passport-local';
import StatusCodes from 'http-status-codes';
import { UserDocument, User } from '../models/user';

export const authenticate = async (req: Request, res: Response, next: Next) => {
  await check('email', 'Email is not valid').isEmail().run(req);
  await check('password', 'Password is not valid').not().isEmpty().run(req);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.sendStatus(StatusCodes.UNAUTHORIZED);
  }

  await passportAuthenticate(req, res, next);
}

const passportAuthenticate = async (req: Request, res: Response, next: Next) => {
  await passport.authenticate('local', (err: Error, user: UserDocument, info: IVerifyOptions) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.sendStatus(StatusCodes.UNAUTHORIZED);
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      res.send({ id: req.user['_id'].toString() });
    });
  })(req, res, next);
};

export const signUp = async (req: Request, res: Response) => {
  const user = new User(req.body);
  const result = await user.save();
  res.send({ email: result.email.toString() });
}