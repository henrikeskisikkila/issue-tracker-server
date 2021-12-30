import mongoose, { Schema, model } from 'mongoose';

type UserDocument = mongoose.Document & {
  username: string,
  email: string,
  password: string
}

const emailValidator = {
  validator: (email) => {
    return /\S+@\S+\.\S+/.test(email);
  },
  message: (email) => {
    return `${email} is not a valid email address`
  }
}

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: emailValidator
  },
  password: {
    type: String,
    required: true,
    minlength: 7
  }
});

userSchema.pre('save', (next) => {
  console.log('TODO: hash a password when a new user is created');
  next();
});

const User = model('User', userSchema);
export default User;
export { UserDocument };