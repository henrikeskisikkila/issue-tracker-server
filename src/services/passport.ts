// var passport = require('passport')
// var LocalStrategy = require('passport-local').Strategy;

import passport from 'passport';
import passportLocal from 'passport-local';
import { NativeError } from 'mongoose';
// import { User, UserDocument } from '../models/user';
const LocalStrategy = passportLocal.Strategy;

// passport.use(new LocalStrategy({ usernameField: 'email'}, (username, password, done) => {
//     User.findOne({ username: username }, (err: NativeError, user: User) => {
//       if (err) {
//         return done(err);
//       }

//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }

//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }

//       return done(null, user);
//     });
//   }
// ));