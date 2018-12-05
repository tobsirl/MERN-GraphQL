import mongoose from 'mongoose';
import { hash } from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    email: String,
    username: String,
    name: String,
    password: String
  },
  {
    timestamps: true
  }
);

userSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    hash(this.password)
  }
  next();
});

export default mongoose.model('User', userSchema);
