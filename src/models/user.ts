import mongoose, { Schema, model, NativeError } from 'mongoose';
import bcrypt from 'bcrypt';

type UserDocument = mongoose.Document & {
  username: string;
  email: string;
  password: string;
  comparePassword: comparePasswordFunction;
};

type comparePasswordFunction = (
  password: string,
  complete: (err: Error, result: boolean) => void) => void;

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
    validate: (email: string) => {
      return /\S+@\S+\.\S+/.test(email);
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 7
  }
});

/**
 * Hash a password when a user data is saved to the database.
 */
userSchema.pre('save', async function save(next) {
  const user = this as UserDocument;
  const saltRounds: number = 10;
  const hash = await bcrypt.hash(user.password, saltRounds);

  if (saltRounds != bcrypt.getRounds(hash)) {
    return next(new NativeError('Password hash failed'));
  }

  user.password = hash;
  next();
});

/**
 * Compare received and stored passwords.
 */
const comparePassword: comparePasswordFunction = function (password: string, complete: Function) {
  bcrypt.compare(password, this.password, (err: Error, result: boolean) => {
    complete(err, result);
  });
}

userSchema.methods.comparePassword = comparePassword;

const User = model('User', userSchema);
export { UserDocument, User };