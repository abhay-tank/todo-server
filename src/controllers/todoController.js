const Todo = require("../models/Todo");
const sendSuccessResponse = require("../middlewares/responses/successResponse");
const sendErrorResponse = require("../middlewares/responses/errorResponse");
const ErrorResponse = require("../models/ErrorResponse");
const selectProperties =
	"todoid todoTitle todoContent createdAt updatedAt -_id";

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
			console.log(result);
			sendSuccessResponse(200, "Successful", result, res);
		})
		.catch((err) => {
			console.log("Error ==> ", err);
			sendErrorResponse(
				new ErrorResponse(400, "Unsuccessful", err.toString()),
				res
			);
		});
};
// GET:id
const getTodo = (req, res) => {
	Todo.findOne({ todoid: req.params.id })
		.select(selectProperties)
		.then((result) => {
			console.log(result);
			sendSuccessResponse(200, "Successful", result, res);
		})
		.catch((err) => {
			console.log(err);
			sendErrorResponse(
				new ErrorResponse(404, "Unsuccessful", err.toString()),
				res
			);
		});
};

// PATCH:id
const updateTodo = (req, res) => {
	let validationArray = ["todoTitle", "todoContent", "todoCompleted"];
	let updates = {};
	validationArray.forEach((key) => {
		if (req.body[key]) {
			updates[key] = req.body[key];
		}
	});
	Todo.findOneAndUpdate({ todoid: req.params.id }, updates)
		.select(selectProperties)
		.then((result) => {
			console.log(result);
			sendSuccessResponse(200, "Successful", result, res);
		})
		.catch((err) => {
			console.log(err);
			sendErrorResponse(
				new ErrorResponse(404, "Unsuccessful", err.toString()),
				res
			);
		});
};

// DELETE:id
const deleteTodo = (req, res) => {
	Todo.findOneAndDelete({ todoid: req.params.id })
		.select(selectProperties)
		.then((result) => {
			console.log(result);
			sendSuccessResponse(200, "Successful", result, res);
		})
		.catch((err) => {
			console.log(err);
			sendErrorResponse(
				new ErrorResponse(404, "Unsuccessful", err.toString()),
				res
			);
		});
};

module.exports = { getAllTodos, createTodo, getTodo, updateTodo, deleteTodo };
