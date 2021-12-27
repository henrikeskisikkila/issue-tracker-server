import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  googleId: String,
  displayName: String
});

const User = model('User', userSchema);
export default User;