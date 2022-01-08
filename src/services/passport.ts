import passport from 'passport';
import passportLocal from 'passport-local';
import { Request, Response, NextFunction as Next } from 'express';
import { StatusCodes } from 'http-status-codes';
import { User, UserDocument } from '../models/user';

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser((user: UserDocument, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err: Error, user: UserDocument) => {
    done(err, user);
  });
});

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email: email }, (err: Error, user: UserDocument) => {
    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false);
    }

    user.comparePassword(password, (err: Error, result: boolean) => {
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

const isAuth = (req: Request, res: Response, next: Next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.sendStatus(StatusCodes.UNAUTHORIZED);
}

export { isAuth };