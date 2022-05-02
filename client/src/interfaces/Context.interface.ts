import { IUser } from "./User.interface"

interface IContext {
  currentUser: IUser | null,
  login: any,
  signup: any,
  updateProfile: void,
  logout: any,
  users: IUser[]
}

export {
  IContext
}