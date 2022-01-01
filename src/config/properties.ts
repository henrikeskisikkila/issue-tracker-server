import development from './development';
import production from './production';
import integration from './integration';

const env = process.env.NODE_ENV;
let properties = development;

if (env === 'production') {
  properties = production;
} else if (env === 'integration') {
  properties = integration;
}

export default properties;