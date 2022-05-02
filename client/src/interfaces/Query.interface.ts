export default interface IQuery<T> {
  data: T | undefined,
  status: string
}