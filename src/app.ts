import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import passport from 'passport';
import issue from './routes/issue';
import user from './routes/user';
import * as authentication from './routes/authentication';
import { isAuthenticated } from './services/passport';

const app = express();

app.use(session({
  secret: 'SECRET'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());


app.get('/login', authentication.login);
app.post('/authenticate', authentication.authenticate);
app.post('/signup', authentication.signUp);

app.get('/welcome', (req, res) => { res.send('welcome') });
app.use('/issue', isAuthenticated, issue);
app.use('/user', user);

export default app;