import { User } from '../models';

export default {
  /**
   * Creates a user
   * @param {object} data
   * @return {object}
   */
  async createUser(data) {
    try {
      return await User.create(data);
    } catch (err) {
      throw new AppError({ status: 400, ...err });
    }
  },

  /**
   * Returns user with public fields
   * @param {string} params
   * @return {Promise<object>}
   */
  getUserWithPublicFields(params) {
    return User.findOne(params).select({
      password: 0,
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    });
  },
};
