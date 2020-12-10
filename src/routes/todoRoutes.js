const express = require("express");
const {
  getAllTodos,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");
const todoRoutes = express.Router();
todoRoutes.route("/").get(getAllTodos).post(createTodo);
todoRoutes.route("/:id").get(getTodo).patch(updateTodo).delete(deleteTodo);

module.exports = todoRoutes;
