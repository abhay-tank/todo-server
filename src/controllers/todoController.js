const Todo = require("../models/Todo");
const sendSuccessResponse = require("../middlewares/responses/successResponse");
const sendErrorResponse = require("../middlewares/responses/errorResponse");
const ErrorResponse = require("../models/ErrorResponse");

const getAllTodos = async (req, res) => {
	Todo.find()
		.select("todoid todoTitle todoContent createdAt updatedAt -_id")
		.then((result) => {
			sendSuccessResponse(200, "Success", result, res);
		})
		.catch((err) => {
			sendErrorResponse(
				new ErrorResponse(500, "Unsuccessful", err.toString()),
				res
			);
		});
};
// POST
const createTodo = (req, res) => {
	let todo = new Todo({
		todoTitle: req.body.todoTitle,
		todoContent: req.body.todoContent,
	});
	todo
		.save()
		.then((result) => {
			sendSuccessResponse();
		})
		.catch((err) => {});
};
// GET:id
const getTodo = (req, res) => {
	res.send("getTodo");
};

// PATCH:id
const updateTodo = (req, res) => {
	res.send("updateTodo");
};

// DELETE:id
const deleteTodo = (req, res) => {
	res.send("deleteTodo");
};

module.exports = { getAllTodos, createTodo, getTodo, updateTodo, deleteTodo };
