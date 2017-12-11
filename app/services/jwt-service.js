import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../config';

export default {
  /**
   * Generates JWT token
   * @param {object} data
   * @return {Promise.<*>}
   */
  async genToken(data) {
    return await jwt.sign(data, JWT_SECRET);
  },
  /**
   * Verify JWT token
   * @param {string} token
   * @return {Promise.<*>}
   */
  async verify(token) {
    return await jwt.verify(token, JWT_SECRET);
  },
};
