import Key from './key';

const integration: Key = {
  mongoURI: process.env.INTEGRATION_MONGODB_URI,
  sessionSecret: process.env.INTEGRATION_SESSION_SECRET
};

export default integration;