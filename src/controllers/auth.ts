import { Request, Response, NextFunction as Next } from 'express';
import { check, validationResult } from 'express-validator';
import passport from 'passport';
import StatusCodes from 'http-status-codes';
import { UserDocument, User } from '../models/user';

/**
 * Authenticate a user
 * @route POST /authenticate
 */
export const authenticate =
  async (req: Request, res: Response, next: Next) => {
    await check('email', 'Email is not valid').isEmail().run(req);
    await check('password', 'Password is not valid').not().isEmpty().run(req);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.sendStatus(StatusCodes.UNAUTHORIZED);
    }

    await passportAuthenticate(req, res, next);
  }

/**
 * Authenticate a user by using Passport authentication middleware
 */
const passportAuthenticate = async (req: Request, res: Response, next: Next) => {
  await passport
    .authenticate('local', (err: Error, user: UserDocument) => {
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

/**
 * Sign up a user
 * @route POST /signup
 */
export const signUp = async (req: Request, res: Response) => {
  const user = new User(req.body);
  const result = await user.save();
  res.send({ email: result.email.toString() });
}