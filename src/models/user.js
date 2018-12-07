import mongoose from 'mongoose';
import { hash } from 'bcryptjs';
import { AsyncResource } from 'async_hooks';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      validate: {
        validator: async email =>
          (await User.where({ emial }).countDocuments()) === 0,
        message: ({ value }) => `Email ${value} has already been taken.`
      }
    },
    username: String,
    name: String,
    password: String
  },
  {
    timestamps: true
  }
);

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    try {
      this.password = await hash(this.password, 10);
    } catch (error) {
      next(error);
    }
  }
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
