import { Summary } from '../models';

/**
 * Check summary by hash
 * Add summary to the ctx if summary exist
 * @return {void}
 */
export default () => async (hash, ctx, next) => {
  const summary = await Summary.findOne({ hash });

  if (!summary) {
    ctx.throw(404, `Summary with id "${hash}" not found`);
  }

  ctx.state.summary = summary;

  await next();
};
