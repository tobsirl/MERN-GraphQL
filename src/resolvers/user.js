import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import Joi from 'joi';
import { signUp, signIn } from '../schemas';
import { UserInputError } from 'apollo-server-express';

import User from '../models/user';

export default {
  Query: {
    users: (root, args, { req }, info) => {
      // TODO auth, projection

      checkSignedIn(req);

      return User.find({});
    },
    user: (root, { id }, context, info) => {
      // TODO auth, projection, sanitization

      checkSignedIn();

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid user ID.`);
      }

      return User.findById(id);
    }
  },
  Mutation: {
    signUp: async (root, args, context, info) => {
      // TODO: not auth, validation

      checkSignedOut();

      await Joi.validate(args, signUp, { abortEarly: false });

      return User.create(args);
    }
  }
};
