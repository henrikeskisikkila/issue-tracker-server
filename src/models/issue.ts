import { Document, Model, model, Schema } from 'mongoose';

interface IIssue extends Document {
  title: String,
  content: String,
  CreatedAt: Date,
  _user: Schema.Types.ObjectId
};

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

const Issue: Model<IIssue> = model('Issue', issueSchema);
export { IIssue, Issue };