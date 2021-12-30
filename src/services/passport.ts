import passport from 'passport';
import passportLocal from 'passport-local';
import { Request, Response, NextFunction as Next } from 'express';
import { StatusCodes } from 'http-status-codes';
import User, { UserDocument } from '../models/user';

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
  User.findOne({ email: email }, (err: Error, user: any) => {
    if (err) {
      console.log(err);
      return done(err);
    }

    if (!user) {
      console.log('user')
      return done(null, false, { message: 'Incorrect username.' });
    }

    if (user.password != password) {
      console.log('password')
      return done(null, false, { message: 'Incorrect password.' });
    }

    //TODO: Compare the user-supplied password with the hashed password stored in the database
    //crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {

    // if (!user.validPassword(password)) {
    //   return done(null, false, { message: 'Incorrect password.' });
    // }

    return done(null, user);
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