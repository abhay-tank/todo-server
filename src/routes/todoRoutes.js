const express = require("express");
const protectRoute = require("../middlewares/protectRoute");
const {
	getAllTodos,
	createTodo,
	getTodo,
	updateTodo,
	deleteTodo,
} = require("../controllers/todoController");

const {
	checkTodoExists,
	checkUpdateValidations,
} = require("../middlewares/validations/todoValidations");
const todoRoutes = express.Router();
todoRoutes
	.route("/")
	.get(protectRoute, getAllTodos)
	.post(protectRoute, createTodo);
todoRoutes
	.route("/:id")
	.get(protectRoute, checkTodoExists, getTodo)
	.patch(protectRoute, checkTodoExists, checkUpdateValidations, updateTodo)
	.delete(protectRoute, checkTodoExists, deleteTodo);

module.exports = todoRoutes;
