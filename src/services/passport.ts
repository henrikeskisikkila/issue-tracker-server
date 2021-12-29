import passport from 'passport';
import passportLocal from 'passport-local';
import { Request, Response, NextFunction as Next } from 'express';
import User, { UserDocument } from '../models/user';

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser((user: UserDocument, done) => {
  console.log(`serializeUser ${user}`);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('deserializeUser');
  User.findById(id, (err: Error, user: UserDocument) => {
    console.log(user)
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

    // if (!user.validPassword(password)) {
    //   return done(null, false, { message: 'Incorrect password.' });
    // }

    return done(null, user);
  });
}
));

const isAuthenticated = (req: Request, res: Response, next: Next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

export { isAuthenticated };