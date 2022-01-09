import dotenv from 'dotenv';

const result = dotenv.config();

if (result.error) {
  throw result.error;
}

const properties: Properties = {
  mongoURI: process.env.MONGODB_URI as string,
  sessionSecret: process.env.SESSION_SECRET as string
};

export default properties;