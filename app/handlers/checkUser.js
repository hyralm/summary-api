/**
 * Checks if ctx contains a user
 * @return {void}
 */
export default () => async (ctx, next) => {
  if (!ctx.state.user) {
    ctx.throw(403, { message: 'Forbidden' });
  }

  await next();
};
