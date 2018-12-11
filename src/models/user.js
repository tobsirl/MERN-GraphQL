import mongoose from 'mongoose';
import { hash } from 'bcryptjs';
import { AsyncResource } from 'async_hooks';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      validate: {
        validator: email => User.doesntExist({ email }),
        message: ({ value }) => `Email ${value} has already been taken.`
      }
    },
    username: {
      type: String,
      validate: {
        validator: username => User.doesntExist({ username }),
        message: ({ value }) => `Email ${value} has already been taken.`
      }
    },
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

userSchema.statics.doesntExist = async function(optons) {
  return (await this.where(options).countDocuments()) === 0;
};

userSchema.methods.matchesPassword = function(password) {
  return compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
