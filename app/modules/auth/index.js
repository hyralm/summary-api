import Router from 'koa-router';

import authController from './controllers/auth-controller';
import checkUser from '../../handlers/checkUser';

const router = new Router({ prefix: '/auth' });

/**
 * Auth routes
 */
router
  .post('/signup', authController.signUp)
  .post('/signin', authController.signIn)
  .get('/user', checkUser(), authController.getCurrentUser);

export default router.routes();
