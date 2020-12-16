const express = require("express");
const protectRoute = require("../middlewares/protectRoute");
const {
	getAllTodos,
	createTodo,
	getTodo,
	updateTodo,
	deleteTodo,
} = require("../controllers/todoController");
const todoRoutes = express.Router();
todoRoutes
	.route("/")
	.get(protectRoute, getAllTodos)
	.post(protectRoute, createTodo);
todoRoutes
	.route("/:id")
	.get(protectRoute, getTodo)
	.patch(protectRoute, updateTodo)
	.delete(protectRoute, deleteTodo);

module.exports = todoRoutes;
