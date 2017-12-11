import { Summary } from '../models';

export default {
  /**
   * Creates the summary
   * @param {object} data
   * @return {Promise.<data>}
   */
  async createSummary(data) {
    const { userHash } = data;
    const summaryCountByUserHash = await Summary.count({ userHash });

    if (summaryCountByUserHash === 3) {
      throw new AppError({
        status: 400,
        message: 'User cannot create more 3 summaries ',
      });
    }

    return Summary.create(data);
  },

  /**
   * Updates the summary by hash
   * @param {object} data
   * @param {Summary} summary
   * @return {Promise.<*|Promise>}
   */
  async updateSummary(data, summary) {
    summary.set(data);

    return summary.save();
  },

  /**
   * Searches summaries by title/tags
   * @param {object} params
   * @return {object}
   */
  async search({ page, size, tags, title }) {
    const query = {
      title: { $regex: title },
    };
    if (tags.length) {
      query.tags = { $in: tags };
    }

    const count = await Summary.count(query).sort({ updatedAt: '-1' });

    let pages = count / size;
    if (pages.toString().indexOf('.') !== -1) {
      pages = parseInt(pages) + 1;
    }
    const summaries = await Summary.find(query)
      .sort({ updatedAt: '-1' })
      .limit(size)
      .skip((page - 1) * size);

    return {
      summaries,
      count,
      pages,
      page,
    };
  },
};
