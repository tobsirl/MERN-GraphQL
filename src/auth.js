import { AuthenticationError } from 'apollo-server-express';
import User from './models/user';

export const attemptSignIn = async (email, password) => {
  const message = 'Incorrect email or password. Please try again.';

  const user = await User.findOne({ email });

  if (!user) {
    throw new AuthenticationError(message);
  }
};

const signedIn = req => req.session.userId;

export const checkSignedIn = req => {
  if (!signedIn(req)) {
    throw new AuthenticationError('You must be signed in');
  }
};

export const checkSignedOut = req => {
  if (signedIn(req)) {
    throw new AuthenticationError('You are already signed in');
  }
};
