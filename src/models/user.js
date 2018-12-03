import mongoose, { Schema } from 'mongoose';

const userSchema = new mongoose.Schema({
  email: String,
  username: String,
  name: String,
  createdAt: String
});

export default mongoose.model('User', userSchema);
