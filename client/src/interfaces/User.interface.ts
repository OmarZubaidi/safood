interface IUser {
  _id: string,
  name: string,
  allergens: Array<string>,
  events: Array<any>,
  uid: string,
  about: string,
  img: string
}

interface IUserContainerProps {
  users: Array<IUser>
}

interface IUserProps {
  user: IUser
}

export {
  IUser,
  IUserContainerProps,
  IUserProps
}