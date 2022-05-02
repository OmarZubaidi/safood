// Package imports
import { Request, Response } from 'express';

// Local imports
import model from '../models/user.model';
import IUser, { IUserDB } from '../interfaces/User.interface';
import asyncErrorHandler from '../utils/asyncErrorHandler';

export async function getUsers (_: Request, res: Response) {
  try {
    const users: IUserDB[] = await model.find();
    res.status(200).send(users);
  } catch (error) {
    asyncErrorHandler(error, res);
  }
}

export async function postUser (req: Request, res: Response) {
  try {
    const { name, allergens, uid, about, img }: IUser = req.body;
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
    const { uid } = req.headers;
    const user: IUserDB | null = await model.findOne({ uid });
    if (user) res.status(200).send(user);
    else res.sendStatus(404);
  } catch (error) {
    asyncErrorHandler(error, res);
  }
}

export async function updateUserAllergens (req: Request, res: Response) {
  try {
    const { uid, allergens }: IUserDB = req.body;
    const user: IUserDB | null = await model.findOneAndUpdate(
      { uid },
      { allergens },
      { new: true }
    );
    if (user) res.status(200).send(user);
    else res.sendStatus(404);
  } catch (error) {
    asyncErrorHandler(error, res);
  }
}
