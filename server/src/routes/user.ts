import { Router } from "express";
import passport from "passport";
import { body } from "express-validator";
import { getProfile, login, logout, register } from "../controllers/user";
import { validatorMiddleWare } from "../middlewares/validatorMiddleware";
import { upload } from "../middlewares/uploadImage";
const router = Router();
router.get("/user/profile", passport.authenticate("jwt"), getProfile);
router.post(
  "/auth/register",
  upload.single("avatar"),
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
