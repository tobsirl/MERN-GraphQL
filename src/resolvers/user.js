import mongoose from 'mongoose';
import Joi from 'joi';
import { signUp, signIn, signOut } from '../schemas';
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
    },
    signIn: async (root, args, { req }, info) => {
      const { userId } = req.session;

      if (userId) {
        return User.findById(userId);
      }

      await Joi.validate(args, signIn, { abortEarly: false });

      const { email, password } = args;

      const user = await Auth.attemptSignIn(email, password);

      req.session.userId = user.id;

      return user;
    },
    signOut: (root, args, { req, res }, info) => {
      Auth.checkSignedIn(req);

      return Auth.signOut(req, res);
    }
  }
};
