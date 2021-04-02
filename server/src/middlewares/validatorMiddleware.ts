import { RequestHandler } from "express";
import { validationResult } from "express-validator";

export const validatorMiddleWare: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsMsgs = errors.array().map((err) => err.msg);
    return res.status(400).json({ errors: errorsMsgs });
  } else {
    next();
  }
};
