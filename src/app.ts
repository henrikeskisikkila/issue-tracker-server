import express from 'express';
import bodyParser from 'body-parser';
import issue from './routes/issue';

const app = express();
app.use(bodyParser.json());
app.use('/issue', issue);

export default app;