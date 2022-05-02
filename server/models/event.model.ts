// Package imports
import mongoose from 'mongoose';

// Local imports
import Event from '../interfaces/Event.interface';

const Schema = new mongoose.Schema<Event>({
  type: {
    type: String,
    required: true
  },
  allergens: [String],
  members: [String],
  date: String,
  menu: mongoose.Schema.Types.Mixed
}, { timestamps: false });

export default mongoose.model<Event>('events', Schema);
