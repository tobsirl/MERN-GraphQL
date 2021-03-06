import { AuthenticationError } from 'apollo-server-express';
import User from './models/user';

require('dotenv').config();

export const attemptSignIn = async (email, password) => {
  const message = 'Incorrect email or password. Please try again.';

  const user = await User.findOne({ email });

  if (!user) {
    throw new AuthenticationError(message);
  }

  if (!(await user.matchesPassword(password))) {
    throw new AuthenticationError(message);
  }

  return user;
};

const signedIn = req => req.session.userId;

export const ensureSignedIn = req => {
  if (!signedIn(req)) {
    throw new AuthenticationError('You must be signed in');
  }
};

export const ensureSignedOut = req => {
  if (signedIn(req)) {
    throw new AuthenticationError('You are already signed in');
  }
};

export const signOut = (req, res) =>
  new Promise((resolve, reject) => {
    req.session.destroy(err => {
      const { SESSION_NAME } = process.env;
      if (err) reject(err);

      res.clearCookie(SESSION_NAME);

      resolve(true);
    });
  });
