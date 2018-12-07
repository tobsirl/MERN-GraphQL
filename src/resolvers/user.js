import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import Joi from 'joi';
import { SignUp, signIn } from '../schemas';
import { UserInputError } from 'apollo-server-express';

import User from '../models/user';

export default {
  Query: {
    users: (root, args, context, info) => {
      // TODO auth, projection
      return User.find({});
    },
    user: (root, { id }, context, info) => {
      // TODO auth, projection, sanitization
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid user ID.`);
      }

      return User.findById(id);
    }
  },
  Mutation: {
    signUp: async (root, args, context, info) => {
      // TODO: not auth, validation

      await Joi.validate(args, SignUp, { abortEarly: false });

      return User.create(args);
    }
  }
};
