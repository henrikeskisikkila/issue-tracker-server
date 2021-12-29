import { Request, Response, NextFunction as Next } from 'express';
import { check, validationResult } from 'express-validator';
import passport from 'passport';
import { IVerifyOptions } from 'passport-local';
import { UserDocument } from '../models/user';

export const login = (req: Request, res: Response) => {
  res.send('login page');
}

export const authenticate = async (req: Request, res: Response, next: Next): Promise<void> => {
  await check('email', 'Email is not valid').isEmail().run(req);
  await check('password', 'Password is not valid').not().isEmpty().run(req);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.redirect('/login');
  }

  passport.authenticate('local', (err: Error, user: UserDocument, info: IVerifyOptions) => {
    if (err) {
      console.log(err);
      return next(err);
    }

    if (!user) {
      console.log('user not found');
      return res.redirect('/login')
    }

    req.logIn(user, (err) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.redirect('/welcome');
    })
  })(req, res, next);
}

export const signUp = (req: Request, res: Response) => {
  res.send('signup');
}
