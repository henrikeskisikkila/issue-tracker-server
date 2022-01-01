import Key from './key';

const production: Key = {
  mongoURI: process.env.PRODUCTION_MONGODB_URI,
  sessionSecret: process.env.PRODUCTION_SESSION_SECRET
};

export default production;