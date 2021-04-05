import { Router } from "express";
import { body } from "express-validator";
import passport from "passport";
import { createTodo, deleteTodo, updateTodo } from "../controllers/todos";

const router = Router();

router.post(
  "/todos/create",
  passport.authenticate("jwt"),
  body("title").not().isEmpty().trim().withMessage("title is required"),
  createTodo
);
router.put("/todos/:id", passport.authenticate("jwt"), updateTodo);
router.delete("/todos/:id", passport.authenticate("jwt"), deleteTodo);

export default router;
