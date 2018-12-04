import mongoose from 'mongoose';

import { User } from '../models/user';

export default {
  Query: {
    users: (root, args, context, info) => {
      // TODO auth, projection
      return User.find({});
    },
    user: (root, args, context, info) => {}
  },
  Mutation: {
    signUp: (root, args, context, info) => {}
  }
};
