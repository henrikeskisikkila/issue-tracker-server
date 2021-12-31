import dotenv from 'dotenv';
import Key from './key';

const result = dotenv.config();

if (result.error) {
  throw result.error;
}

const development: Key = {
  mongoURI: process.env.DEV_MONGODB_URI,
  sessionSecret: process.env.DEV_SESSION_SECRET
};

export default development;