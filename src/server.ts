import mongoose from 'mongoose';
import app from './app';

const keys = require('./config/keys');
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

app.set('port', process.env.PORT || 5000);


app.listen(app.get('port'), () => {
  console.log(`Server is listening at port ${app.get('port')}`);
  console.log(`Mode is ${app.get('env')}`);
});