import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';

import error from './error';
import jwt from './jwt';
import { IS_DEV } from '../utils/env';

/**
 * Add the handlers to the app
 * @param {Application} app
 */
export default app => {
  if (IS_DEV) {
    app.use(logger());
  }

  app.use(error());
  app.use(bodyParser());
  app.use(jwt());
};
