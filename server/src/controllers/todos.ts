import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import Todo from "../models/Todo";
import User from "../models/User";
import { IUser } from "../types";

const createTodo: RequestHandler = async (req, res, next) => {
  try {
    const existedUser = req.user as IUser;
    const user = await User.findOne({ username: existedUser.username });
    const todo = new Todo(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errs = errors.array().map((err) => err.msg);
      return res.status(400).json({ errors: errs });
    }
    res.json({ message: "created" });
    if (user) {
      todo.user = user;
      user.todos.push(todo);
      await todo.save();
      await user.save();
      return res.json({ todo, message: "todo is being created successuflly" });
    } else {
      return res.status(401).json({ message: "unauthorized" });
    }
  } catch (err: unknown) {
    res.status(500).json({ message: "something went wrong" });
    throw err;
  }
};
const updateTodo: RequestHandler = async (req, res, next) => {
  try {
    const loggedUser = req.user as IUser;
    const user = await User.findOne({ username: loggedUser.username });
    if (user) {
      const updatedTodo = await Todo.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      await user.save();
      return res.json(updatedTodo);
    } else {
      return res.status(401).json({ message: "unauthorized" });
    }
  } catch (error: unknown) {
    res.status(500).json({ message: "something went wrong" });
  }
};
const deleteTodo: RequestHandler = async (req, res, next) => {
  try {
    const loggedUser = req.user as IUser;
    const user = await User.findOne({ username: loggedUser.username });
    if (user) {
      await Todo.findOneAndDelete({ _id: req.params.id });
      await user.save();
      res.json({ message: "todo deleted successuffly" });
    }
  } catch (error: unknown) {
    res.status(500).json({ message: "something went wrong" });
  }
};
export { createTodo, updateTodo, deleteTodo };
