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
  try {
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(401).json({ error: "user is already exist" });
    }
    const hashedPassword = await hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
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
const logout: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.clearCookie("access_token");
  req.logOut();
  res.json({ message: "successfully logout" });
};
export { register, login, logout };
