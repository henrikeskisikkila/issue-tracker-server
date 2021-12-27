import express from 'express';
import bodyParser from 'body-parser';
import issue from './routes/issue';
import user from './routes/user';

const app = express();
app.use(bodyParser.json());
app.use('/issue', issue);
app.use('/user', user);

export default app;