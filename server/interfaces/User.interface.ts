// Package imports
import { ObjectId } from 'mongoose';

export default interface IUser {
  name: string;
  allergens: string[];
  events: string[];
  uid: string;
  about: string;
  img: string;
}

export interface IUserDB extends IUser {
  _id: ObjectId;
}