import Koa from 'koa';

import connectorsInit from './connectors';
import initHandlers from './handlers';
import modules from './modules';
import AppError from './helpers/appError';

/**
 * Connects to DB ...
 */
connectorsInit();

/**
 * Sets up AppError as a global variable
 * @type {AppError}
 */
global.AppError = AppError;

/**
 * Creates app
 */
const app = new Koa();

/**
 * Add the handlers to the app
 */
initHandlers(app);

/**
 * Add the modules to the app
 */
app.use(modules);


export default app;
