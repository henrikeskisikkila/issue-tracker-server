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
import { error } from './controllers/error';

const app = express();

/**
 * Configure session handling middleware.
 */
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: properties.sessionSecret,
  store: MongoStore.create({
    mongoUrl: properties.mongoURI
  })
}));

/**
 * Set HTTP body prosessing for json and urlencoded data.
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Initialize Passport for authentication and
 * login session handling.
 */
app.use(passport.initialize());
app.use(passport.session());

/**
 * Handle authorization and authentication requests.
 */
app.post('/authenticate', auth.authenticate);
app.post('/signup', auth.signUp);

/**
 * Handle issue requests.
 */
app.get('/issues', isAuth, issue.getIssues);
app.get('/issue/:id', isAuth, issue.getIssue);
app.post('/issue', isAuth, issue.save);
app.put('/issue/:id', isAuth, issue.update);
app.delete('/issue/:id', isAuth, issue.remove);

/**
 * Handle project requests
 */
app.post('/project', isAuth, project.create);
app.put('/project/:id', isAuth, project.update);
app.get('/projects', isAuth, project.getProjects);

/**
 * A middleware function for error handling
 */
app.use(error);

export default app;