// Package imports
import { Request, Response } from 'express';

// Local imports
import model from '../models/event.model';
import IEvent from '../interfaces/Event.interface';
import asyncErrorHandler from '../utils/asyncErrorHandler';

export async function getEvents (_: Request, res: Response) {
  try {
    const events: IEvent[] = await model.find();
    res.status(200).send(events);
  } catch (error) {
    asyncErrorHandler(error, res);
  }
}

export async function getEvent (req: Request, res: Response) {
  try {
    const event: IEvent | null = await model.findOne({ _id: req.params._id });
    res.status(200).send(event);
  } catch (error) {
    asyncErrorHandler(error, res);
  }
}

export async function postEvent (req: Request, res: Response) {
  try {
    const { type, allergens, members, date, menu }: IEvent = req.body;
    const event: IEvent = await model.create({
      type,
      allergens,
      members,
      date,
      menu
    });
    res.status(201).send(event);
  } catch (error) {
    asyncErrorHandler(error, res);
  }
}
