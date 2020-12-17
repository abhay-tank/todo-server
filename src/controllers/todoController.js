const Todo = require("../models/Todo");
const sendSuccessResponse = require("../middlewares/responses/successResponse");
const sendErrorResponse = require("../middlewares/responses/errorResponse");
const ErrorResponse = require("../models/ErrorResponse");
const selectProperties =
	"todoid todoTitle todoContent todoCompleted createdAt updatedAt -_id";

const getAllTodos = async (req, res) => {
	Todo.find()
		.select(selectProperties)
		.then((result) => {
			sendSuccessResponse(200, "Successful", result, res);
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
			sendSuccessResponse(200, "Successful", result, res);
		})
		.catch((err) => {
			console.error("Error ==> ", err);
			sendErrorResponse(
				new ErrorResponse(400, "Unsuccessful", err.toString()),
				res
			);
		});
};
// GET:id
const getTodo = (req, res) => {
	sendSuccessResponse(200, "Successful", req.currentTodo, res);
};

// PATCH:id
const updateTodo = (req, res) => {
	Todo.findOneAndUpdate({ todoId: req.params.id }, req.updates)
		.select(selectProperties)
		.then((result) => {
			sendSuccessResponse(200, "Successful", result, res);
		})
		.catch((err) => {
			console.error(err);
			sendErrorResponse(
				new ErrorResponse(404, "Unsuccessful", err.toString()),
				res
			);
		});
};

// DELETE:id
const deleteTodo = (req, res) => {
	Todo.findOneAndDelete({ todoId: req.params.id })
		.then((result) => {
			if (result) {
				sendSuccessResponse(200, "Successful", result, res);
			} else {
				sendErrorResponse(
					new ErrorResponse(500, "Unsuccessful", "Error deleting Todo"),
					res
				);
			}
		})
		.catch((err) => {
			console.error(err);
			sendErrorResponse(
				new ErrorResponse(500, "Unsuccessful", err.toString()),
				res
			);
		});
};

module.exports = { getAllTodos, createTodo, getTodo, updateTodo, deleteTodo };
