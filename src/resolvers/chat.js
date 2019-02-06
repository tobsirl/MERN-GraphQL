import Joi from 'joi';
import { startChat } from '../schemas';
import User from '../models/user';
import { UserInputError } from 'apollo-server-core';

export default {
  Mutation: {
    startChat: async (root, args, { req }, info) => {
      const { userId } = req.session;
      const { title, userIds } = args;

      await Joi.validate(args, startChat(userId), { abortEarly: false });

      const idsFound = await User.where('_id')
        .in(userIds)
        .countDocuments();

      if (idsFound !== userIds.length) {
        throw new UserInputError('One or more User IDs are invalid.');
      }

      userIds.push(userId);

      const chat = chat.create({ title, users: userIds });

      await User.updateMany(
        { _id: { $in: userIds } },
        {
          $push: { chats: chat }
        }
      );

      return chat;
    }
  }
};
