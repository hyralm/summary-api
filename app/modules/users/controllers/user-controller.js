import { Summary } from '../../summaries/models';

export default {
  /**
   * Returns summaries by user hash
   * @param {object} ctx
   * @return {void}
   */
  async getSummariesByUserHash(ctx) {
    const { state: { user: { hash: userHash } } } = ctx;

    const summaries = await Summary.find({ userHash });

    ctx.body = { data: summaries };
  },
};
