import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import Joi from 'joi';
import { signUp, signIn } from '../schemas';
import { UserInputError } from 'apollo-server-express';
import * as Auth from '../auth';

import User from '../models/user';

export default {
  Query: {
    me: (root, args, { req }, info) => {
      // TODO projection
      Auth.checkSignedIn(req);

      return User.findById(req.session.userId);
    },
    users: (root, args, { req }, info) => {
      // TODO auth, projection

      Auth.checkSignedIn(req);

      return User.find({});
    },
    user: (root, { id }, { req }, info) => {
      // TODO auth, projection, sanitization

      Auth.checkSignedIn(req);

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid user ID.`);
      }

      return User.findById(id);
    }
  },
  Mutation: {
    signUp: async (root, args, { req }, info) => {
      // TODO: not auth, validation

      Auth.checkSignedOut(req);

      await Joi.validate(args, signUp, { abortEarly: false });

      return User.create(args);
    }
  }
};
