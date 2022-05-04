import { IRecipe } from './Recipe.interface';

interface IEvent {
  _id?: string;
  allergens: string[];
  date: string;
  members: string[];
  type: string;
  menu: IRecipe[];
}

interface IEventProps {
  event: IEvent;
}

interface IEventsContainerProps {
  list: IEvent[];
  user: any;
}

export {
  IEvent,
  IEventsContainerProps,
  IEventProps
}