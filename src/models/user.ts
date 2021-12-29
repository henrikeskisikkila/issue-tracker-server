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

// const encrypt = (value: String) => {
//   return bcrypt.hash(value, 12);
// }

const User = model('User', userSchema);
export default User;
export { UserDocument };