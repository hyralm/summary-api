import jwtService from '../services/jwt-service';
import { User } from '../modules/users/models';

/**
 * Checks JWT token
 * Adds user to the ctx
 * @return {void}
 */
export default () => async (ctx, next) => {
  try {
    const { authorization } = ctx.headers;
    if (authorization) {
      const { email } = await jwtService.verify(authorization);
      ctx.state.user = await User.findOne({ email });
    }
  } catch (err) {
    ctx.throw(401, 'Invalid Token');
  }
  await next();
};
