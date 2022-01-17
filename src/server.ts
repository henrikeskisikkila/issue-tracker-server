import mongoose from 'mongoose';
import app from './app';
import properties from './config/properties';

/**
 * Connect to the database 
 */
mongoose.connect(properties.mongoURI);

/**
 * Define IP Port for this service
 */
const port = process.env.PORT || 5000;

/**
 * Start listening to requests.
 */
app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
  console.log(`Mode is ${app.get('env')}`);
});