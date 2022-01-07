import dotenv from 'dotenv';

const result = dotenv.config();

if (result.error) {
  throw result.error;
}

const properties = {
  mongoURI: process.env.MONGODB_URI,
  sessionSecret: process.env.SESSION_SECRET
};

export default properties;