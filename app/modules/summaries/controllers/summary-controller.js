import pick from 'lodash/pick';

import parseSearchQuery from '../helpers/parseSearchQuery';
import { Summary } from '../models';
import { SummaryService } from '../services';

export default {
  /**
   * Creates summary
   * Returns created summary
   * @param {object} ctx
   * @return {void}
   */
  async create(ctx) {
    const summaryData = {
      ...pick(ctx.request.body, Summary.createFields),
      userHash: ctx.state.user.hash,
    };
    try {
      const { _id } = await SummaryService.createSummary(summaryData);
      const summary = await Summary.findOne({ _id });

      ctx.status = 201;
      ctx.body = { data: summary };
    } catch (err) {
      ctx.throw(400, err);
    }
  },

  /**
   * Updates summary
   * Returns updated summary
   * @param {object} ctx
   * @return {void}
   */
  async update(ctx) {
    const { request: { body }, state: { summary, user: { hash } } } = ctx;

    if (summary.userHash !== hash) {
      ctx.throw(
        403,
        `Forbidden. Summary with hash "${
          summary.hash
        }" doesn't belong user with hash "${hash}"`
      );
    }

    const newData = pick(body, Summary.createFields);
    const updatedSummary = await SummaryService.updateSummary(newData, summary);

    ctx.body = { data: updatedSummary };
  },

  /**
   * Creates summary
   * Returns hash of th deleted summary
   * @param {object} ctx
   * @return {void}
   */
  async delete(ctx) {
    const { state: { summary, user: { hash } } } = ctx;

    if (summary.userHash !== hash) {
      ctx.throw(
        403,
        `Forbidden. Summary with hash "${
          summary.hash
        }" doesn't belong user with hash "${hash}"`
      );
    }

    await summary.remove();

    ctx.body = { data: { hash: summary.hash } };
  },

  /**
   * Returns summary by the hash
   * @param {object} ctx
   * @return {void}
   */
  async getSummary(ctx) {
    const { state: { summary } } = ctx;

    ctx.body = { data: pick(summary, Summary.createFields) };
  },

  /**
   * Searches summaries by title/tags
   * @param {object} ctx
   * @return {void}
   */
  async searchSummaries(ctx) {
    const queryParams = pick(ctx.request.query, [
      'title',
      'tags',
      'size',
      'page',
    ]);
    const filter = parseSearchQuery(queryParams);
    const { summaries, ...rest } = await SummaryService.search(filter);

    ctx.body = {
      data: summaries,
      filter,
      ...rest,
    };
  },
};
