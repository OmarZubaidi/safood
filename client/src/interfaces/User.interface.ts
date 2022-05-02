import { IEvent } from './Events.interface'

interface IUser {
  _id: string,
  name: string,
  allergens: string[],
  events: IEvent[],
  uid: string,
  about: string,
  img: string
}

interface IUserContainerProps {
  users: IUser[]
}

interface IUserProps {
  user: IUser
}

export {
  IUser,
  IUserContainerProps,
  IUserProps
}