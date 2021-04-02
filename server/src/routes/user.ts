import { Router } from "express";
import passport from "passport";
import { body } from "express-validator";
import { login, logout, register } from "../controllers/user";
import { validatorMiddleWare } from "../middlewares/validatorMiddleware";
const router = Router();
router.post(
  "/auth/register",
  body("username")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("username must be not empty"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters"),
  validatorMiddleWare,
  register
);
router.post(
  "/auth/login",
  body("username")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("password must not be an empty"),
  body("password")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("password must not be an empty"),
  validatorMiddleWare,
  passport.authenticate("local"),
  login
);
router.get("/auth/logout", logout);
export default router;
