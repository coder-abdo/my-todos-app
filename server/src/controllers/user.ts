import { hash } from "bcryptjs";
import { NextFunction, RequestHandler, Request, Response } from "express";
import { validationResult } from "express-validator";
import { sign } from "jsonwebtoken";
import User from "../models/User";
import { IUser } from "../types";

const register: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, username, password } = req.body;
  const results = validationResult(req);
  try {
    if (!results.isEmpty()) {
      let errs = results.array().map((err) => err.msg);
      return res.status(400).json({ errors: errs });
    }
    const existedUser = await User.findOne({ username });
    if (existedUser) {
      return res.status(401).json({ error: "user is already exist" });
    }
    const hashedPassword = await hash(password, 12);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      avatar: req.file.originalname,
    });
    await user.save();
    res.json({ message: "successfully registered" });
  } catch (err: unknown) {
    next(err);
  }
};

const login: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.isAuthenticated()) {
      const { user }: { user: IUser | any } = req;
      const token = sign({ _id: user._id }, `${process.env.JWT_SECRET}`);
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      return res.json({ message: "successfully login", token });
    }
  } catch (error: unknown) {
    next(error);
  }
};
const getProfile: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user as IUser;
    if (user) {
      const savedUser = await User.findOne({
        _id: user._id,
      }).populate("todos");
      return res.json(savedUser);
    } else {
      return res.status(401).json({ message: "unauthorized" });
    }
  } catch (error: unknown) {
    res.status(500).json({ message: "something went wrong" });
  }
};
const logout: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.clearCookie("access_token");
  req.logOut();
  res.json({ message: "successfully logout" });
};
export { register, login, logout, getProfile };
