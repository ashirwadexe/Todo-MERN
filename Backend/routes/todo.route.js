import express from "express";
import { createTodo, deleteTodo, getAllTodos, updateTodo } from "../controllers/todo.controller.js";
const router = express.Router();

router.route("/create").post(createTodo);
router.route("/todos").get(getAllTodos);
router.route("/update/:todoId").put(updateTodo) ;
router.route("/delete/:todoId").delete(deleteTodo) ;

export default router;