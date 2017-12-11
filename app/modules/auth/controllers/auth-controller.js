import pick from 'lodash/pick';

import jwtService from '../../../services/jwt-service';
import { User } from '../../users/models';
import { UserService } from '../../users/services';

export default {
  /**
   * User sign up
   * Creates new user
   *
   * @param {object} ctx
   * @return {void}
   */
  async signUp(ctx) {
    const userData = pick(ctx.request.body, User.createFields);
    const { _id } = await UserService.createUser(userData);
    const user = await UserService.getUserWithPublicFields({ _id });

    ctx.status = 201;
    ctx.body = { data: user };
  },

  /**
   * User sign in
   * Returns JWT token
   *
   * @param {object} ctx
   * @return {void}
   */
  async signIn(ctx) {
    const { email, password } = ctx.request.body;

    if (!email || !password) {
      ctx.throw(400, { message: 'Invalid data' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      ctx.throw(404, { message: 'User not found' });
    }

    if (!user.comparePasswords(password)) {
      ctx.throw(400, { message: 'Invalid data' });
    }

    const token = await jwtService.genToken({ email });

    ctx.body = { data: token };
  },

  /**
   * Returns current user
   * @param {object} ctx
   * @return {void}
   */
  async getCurrentUser(ctx) {
    const { state: { user: { _id } } } = ctx;
    const user = await UserService.getUserWithPublicFields({ _id });

    ctx.body = { data: user };
  },
};
