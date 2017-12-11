import config from 'config';
import dotenv from 'dotenv';

import envs from './constants/envs';

/**
 *  Loads environment variables from .env file into process.env
 */
dotenv.config();

/**
 * Sets up environment
 * @type {string}
 */
const ENV = process.env.NODE_ENV || 'development';
if (!envs[ENV]) {
  throw Error(`Unknown env '${ENV}'`);
}

/**
 * Sets up Mongo URI
 * @type {string}
 */
const MONGO_URI = process.env.MONGO_URI || config.get('mongo.uri');

/**
 * Sets up port
 * @type {number}
 */
const PORT = process.env.PORT || config.get('port');

/**
 * Sets up JWT secret
 * @type {string}
 */
const JWT_SECRET = process.env.JWT_SECRET || config.get('jwt.secret');

if (!JWT_SECRET) {
  throw Error('JWT secret string must be passed');
}

export { ENV, JWT_SECRET, MONGO_URI, PORT };
