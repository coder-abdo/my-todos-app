import { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  todos: ITodo[];
}
export interface ITodo extends Document {
  title: string;
  completed: boolean;
  user: IUser;
}
