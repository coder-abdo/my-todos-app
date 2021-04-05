import { model, Schema } from "mongoose";
import { ITodo } from "../types";

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: String,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Todo = model<ITodo>("Todo", todoSchema);

export default Todo;
