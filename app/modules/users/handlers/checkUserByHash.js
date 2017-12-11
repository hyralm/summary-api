import { User } from '../models';

/**
 * Checks user by hash
 * Adds the user to the ctx if the user exist
 * @return {void}
 */
export default () => async (hash, ctx, next) => {
  const user = await User.findOne({ hash });

  if (!user) {
    ctx.throw(404, `User with hash "${hash}" not found`);
  }

  ctx.state.user = user;

  await next();
};
