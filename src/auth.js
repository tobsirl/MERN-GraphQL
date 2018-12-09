import { AuthenticationError } from 'apollo-server-express';

const checkSignedIn = req => {
  if (req.session.userId) {
    throw new AuthenticationError('You must be signed in');
  }
};
