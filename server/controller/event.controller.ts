// Package imports
import { Request, Response } from 'express';

// Local imports
import model from '../models/event.model';
import IEvent, { IEventDB } from '../interfaces/Event.interface';
import asyncErrorHandler from '../utils/asyncErrorHandler';

// TODO It's weird to me that events use Mongo's _id and users use a uid. We
// TODO should make it consistent and give events their own id or something. I
// TODO only noticed this cause the docs recommend we use 'findById' instead of
// TODO 'findOne' when looking for an _id.
export async function getEvents (_: Request, res: Response) {
  try {
    const events: IEventDB[] = await model.find();
    res.status(200).send(events);
  } catch (error) {
    asyncErrorHandler(error, res);
  }
}

export async function getEvent (req: Request, res: Response) {
  try {
    const { _id } = req.params;
    const event: IEventDB | null = await model.findById(_id);
    if (event) res.status(200).send(event);
    else res.sendStatus(404);
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
