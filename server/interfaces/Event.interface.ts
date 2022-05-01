// Package imports
import { ObjectId } from 'mongoose';

// Local imports
import Recipe from './Recipe.interface'

export default interface IEvent {
  type: string;
  allergens: string[];
  members: string[];
  date: string;
  menu: Recipe[];
}

export interface IEventDB extends IEvent {
  _id: ObjectId;
}