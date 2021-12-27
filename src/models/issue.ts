import { model, Schema } from 'mongoose';

const issueSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
});

const Issue = model('Issue', issueSchema);
export default Issue;