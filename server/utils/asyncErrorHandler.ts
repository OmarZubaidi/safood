// Package imports
import { Response } from 'express';

export default function asyncErrorHandler (error: any, res: Response) {
  console.error(error);
  res.sendStatus(500);
}
