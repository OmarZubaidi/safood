// Package imports
import mongoose from 'mongoose';

// Local imports
import User from '../interfaces/User.interface';

const Schema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: true
  },
  allergens: [String],
  events: [String],
  uid: {
    type: String,
    required: true
  },
  about: String,
  img: String
}, { timestamps: false });

export default mongoose.model<User>('users', Schema);
