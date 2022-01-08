import mongoose, { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

type UserDocument = mongoose.Document & {
  username: string;
  email: string;
  password: string;
  comparePassword: comparePasswordFunction;
}

type comparePasswordFunction = (password: string, complete: (err: Error, result: boolean) => void) => void;

const emailValidator = {
  validator: (email) => {
    return /\S+@\S+\.\S+/.test(email);
  },
  message: (email) => {
    return `${email} is not a valid email address`
  }
}

const userSchema = new Schema<UserDocument>({
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

userSchema.pre('save', function save(next) {
  const user = this as UserDocument;
  bcrypt.genSalt((err: Error, salt: string) => {
    if (err) {
      return next(err)
    }

    bcrypt.hash(user.password, salt, (err: Error, hash) => {
      if (err) {
        return next(err)
      }
      user.password = hash;
      next();
    });
  });
});

const comparePassword = function (password: string, complete: Function) {
  bcrypt.compare(password, this.password, (err: Error, result: boolean) => {
    complete(err, result);
  });
}

userSchema.methods.comparePassword = comparePassword;

const User = model('User', userSchema);
export { UserDocument, User };