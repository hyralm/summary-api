import Router from 'koa-router';

import checkUserByHash from './handlers/checkUserByHash';
import { User } from './models';
import userController from './controllers/user-controller';

const router = new Router({ prefix: '/users' });

/**
 * User routes
 */
router
  .param('hash', checkUserByHash())
  .get('/:hash/summaries', userController.getSummariesByUserHash);

export { User };

export default router.routes();
