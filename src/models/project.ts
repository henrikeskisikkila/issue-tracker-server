import { Schema, model } from 'mongoose';

const projectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
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

const Project = model('Project', projectSchema);
export default Project;