// Package imports
import { Request, Response } from 'express';

// Local imports
import model from '../models/user.model';
import IUser from '../interfaces/User.interface';
import asyncErrorHandler from '../utils/asyncErrorHandler';

export async function getUsers (_: Request, res: Response) {
  try {
    const users: IUser[] = await model.find();
    res.status(200).send(users);
  } catch (error) {
    asyncErrorHandler(error, res);
  }
}

export async function postUser (req: Request, res: Response) {
  try {
    const { name, allergens, uid, about, img } = req.body;
    const user: IUser = await model.create({
      name,
      allergens,
      uid,
      about,
      img
    });
    res.status(201).send(user);
  } catch (error) {
    asyncErrorHandler(error, res);
  }
}

export async function getUser (req: Request, res: Response) {
  try {
    const user: IUser | null = await model.findOne({ uid: req.headers.uid });
    res.status(200).send(user);
  } catch (error) {
    asyncErrorHandler(error, res);
  }
}

export async function updateUserAllergens (req: Request, res: Response) {
  try {
    const user: IUser | null = await model.findOneAndUpdate(
      { uid: req.body.uid },
      { allergens: req.body.allergens },
      { new: true }
    );
    res.status(200).send(user);
  } catch (error) {
    asyncErrorHandler(error, res);
  }
}
