import { Request, Response, NextFunction as Next } from 'express';
import { check, validationResult } from 'express-validator';
import passport from 'passport';
import { IVerifyOptions } from 'passport-local';
import StatusCodes from 'http-status-codes';
import User, { UserDocument } from '../models/user';

export const authenticate = async (req: Request, res: Response, next: Next) => {
  await check('email', 'Email is not valid').isEmail().run(req);
  await check('password', 'Password is not valid').not().isEmpty().run(req);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.sendStatus(StatusCodes.UNAUTHORIZED);
  }

  //TODO: Refactor, mayby this could be transfered to services
  passport.authenticate('local', (err: Error, user: UserDocument, info: IVerifyOptions) => {
    if (err) {
      console.log(err);
      return next(err);
    }

    if (!user) {
      console.log('user not found');
      return res.sendStatus(StatusCodes.UNAUTHORIZED);
    }

    req.logIn(user, (err) => {
      if (err) {
        console.log(err);
        return next(err);
      }

      res.sendStatus(StatusCodes.OK);
    });
  })(req, res, next);
}

export const signUp = async (req: Request, res: Response, next: Next): Promise<void> => {
  const user = new User(req.body);
  const result = await user.save();
  res.send({ email: result.email.toString() });
}