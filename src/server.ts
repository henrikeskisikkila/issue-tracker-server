import mongoose from 'mongoose';
import app from './app';
import properties from './config/properties';

mongoose.Promise = global.Promise;
mongoose.connect(properties.mongoURI);

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), () => {
  console.log(`Server is listening at port ${app.get('port')}`);
  console.log(`Mode is ${app.get('env')}`);
});