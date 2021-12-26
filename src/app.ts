import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import issue from './routes/issue';

const keys = require('./config/keys');
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();
app.use(bodyParser.json());

app.use('/issue', issue);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  return console.log(`Server is listening at port ${PORT}`);
})

export { app, mongoose, server };