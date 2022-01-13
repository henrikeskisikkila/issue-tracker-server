import passport from 'passport';
import passportLocal from 'passport-local';
import { Request, Response, NextFunction as Next } from 'express';
import { StatusCodes } from 'http-status-codes';
import { NativeError } from 'mongoose';
import { User, UserDocument } from '../models/user';

const LocalStrategy = passportLocal.Strategy;

/**
 * Sign in by using email and password.
 */
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email: email }, (err: NativeError, user: UserDocument) => {
    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false);
    }

    user.comparePassword(password, (err: NativeError, result: boolean) => {
      if (err) {
        return done(err);
      }

      if (result == true) {
        return done(undefined, user);
      }

      return done(undefined, false);
    });
  });
}
));

/**
 * Check if a request is authenticated.
 */
const isAuth = (req: Request, res: Response, next: Next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.sendStatus(StatusCodes.UNAUTHORIZED);
}

/**
 * Serialize user instance.
 * This is middleware funtionality of Passport.
 */
passport.serializeUser((user: UserDocument, done) => {
  done(null, user.id);
});

/**
 * Deserialize user instance.
 * This is middleware funtionality of Passport.
 */
passport.deserializeUser((id, done) => {
  User.findById(id, (err: NativeError, user: UserDocument) => {
    done(err, user);
  });
});

export { isAuth };