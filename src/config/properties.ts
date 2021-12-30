import development from './development';
import production from './production';
import integration from './integration';

let properties = development;

if (process.env.NODE_ENV === 'production') {
  properties = production;
} else if (process.env.NODE_ENV === 'integration') {
  properties = integration;
}

export default properties;