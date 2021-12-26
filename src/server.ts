import mongoose from 'mongoose';
import app from './app';

const keys = require('./config/keys');
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  return console.log(`Server is listening at port ${PORT}`);
});