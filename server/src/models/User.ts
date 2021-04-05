import { model, Schema } from "mongoose";
import { IUser } from "../types";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
    required: true,
  },
  todos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
});

const User = model<IUser>("User", userSchema);
export default User;
