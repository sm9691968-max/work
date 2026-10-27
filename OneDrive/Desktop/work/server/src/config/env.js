const path = require('node:path');

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const nodeEnv = process.env.NODE_ENV || 'development';
const defaults = {
  development: {
    port: 5000,
    mongodbUri: 'mongodb://localhost:27017/shopsphere',
    jwtExpiresIn: '7d',
    clientUrl: 'http://localhost:5173',
  },
  production: {
    port: 5000,
    mongodbUri: undefined,
    jwtExpiresIn: '7d',
    clientUrl: undefined,
  },
};

if (!Object.hasOwn(defaults, nodeEnv)) {
  throw new Error(`NODE_ENV must be either "development" or "production"; received "${nodeEnv}".`);
}

const errors = [];
const environmentDefaults = defaults[nodeEnv];

function readValue(name, fallback) {
  const value = process.env[name] || fallback;
  if (typeof value !== 'string' || value.trim() === '') {
    errors.push(`${name} is required when NODE_ENV=${nodeEnv}.`);
    return undefined;
  }
  return value.trim();
}

const portValue = process.env.PORT || String(environmentDefaults.port);
const port = Number(portValue);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  errors.push('PORT must be an integer between 1 and 65535.');
}

const mongodbUri = readValue('MONGODB_URI', environmentDefaults.mongodbUri);
if (mongodbUri && !/^mongodb(?:\+srv)?:\/\//i.test(mongodbUri)) {
  errors.push('MONGODB_URI must start with mongodb:// or mongodb+srv://.');
}

const jwtSecret = readValue('JWT_SECRET');
if (
  nodeEnv === 'production' &&
  jwtSecret &&
  (jwtSecret.length < 32 || /^(change[-_ ]?me|your[_ -]?jwt|replace[-_ ]?with)/i.test(jwtSecret))
) {
  errors.push('JWT_SECRET must be a non-placeholder value with at least 32 characters in production.');
}

const jwtExpiresIn = readValue('JWT_EXPIRES_IN', environmentDefaults.jwtExpiresIn);
if (jwtExpiresIn && !/^\d+(?:s|m|h|d|w|y)$/i.test(jwtExpiresIn)) {
  errors.push('JWT_EXPIRES_IN must be a duration such as 15m, 7d, or 1y.');
}

const clientUrl = readValue('CLIENT_URL', environmentDefaults.clientUrl);
if (clientUrl) {
  try {
    const url = new URL(clientUrl);
    if (!['http:', 'https:'].includes(url.protocol)) {
      errors.push('CLIENT_URL must use http or https.');
    } else if (nodeEnv === 'production' && url.protocol !== 'https:') {
      errors.push('CLIENT_URL must use https in production.');
    }
  } catch {
    errors.push('CLIENT_URL must be a valid URL.');
  }
}

if (errors.length > 0) {
  throw new Error(`Invalid environment configuration:\n${errors.map((error) => `- ${error}`).join('\n')}`);
}

module.exports = Object.freeze({
  nodeEnv,
  isDevelopment: nodeEnv === 'development',
  isProduction: nodeEnv === 'production',
  port,
  mongodbUri,
  jwtSecret,
  jwtExpiresIn,
  clientUrl,
});