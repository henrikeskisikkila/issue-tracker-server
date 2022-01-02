import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import bodyParser from 'body-parser';
import passport from 'passport';
import * as auth from './controllers/auth';
import * as issue from './controllers/issue';
import * as project from './controllers/project';
import { isAuth } from './services/passport';
import properties from './config/properties';
import error from './controllers/error';

const app = express();

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: properties.sessionSecret,
  store: MongoStore.create({
    mongoUrl: properties.mongoURI
  })
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.get('/ping', (req, res) => { res.send('pong') });

app.post('/authenticate', auth.authenticate);
app.post('/signup', auth.signUp);

app.get('/issues', isAuth, issue.issues);
app.get('/issue/:id', isAuth, issue.issue);
app.post('/issue', isAuth, issue.save);
app.put('/issue/:id', isAuth, issue.update);
app.delete('/issue/:id', isAuth, issue.remove);

app.post('/project', isAuth, project.create);

app.use(error);

export default app;