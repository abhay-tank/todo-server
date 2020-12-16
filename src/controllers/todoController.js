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
	let validationArray = ["todoTitle", "todoContent", "todoCompleted"];
	let updates = {};
	let checkFields = Object.keys(req.body).some((key) =>
		validationArray.includes(key)
	);
	if (!checkFields) {
		return sendErrorResponse(
			new ErrorResponse(
				400,
				"Unsuccessful",
				"Atleast one field needed to perform update"
			),
			res
		);
	}
	validationArray.forEach((key) => {
		if (Object.keys(req.body).includes(key)) {
			if (key == "todoCompleted" && Boolean(req.body[key])) {
				// Cannot Change Status once its completed
				if (req.currentTodo.todoCompleted != true) {
					updates[key] = req.body[key];
				}
			} else if (req.body[key].trim().length > 0) {
				updates[key] = req.body[key];
			} else {
				return sendErrorResponse(
					new ErrorResponse(
						404,
						"Unsuccessful",
						"Fields cannot have null values."
					),
					res
				);
			}
		}
	});
	if (Object.keys(updates).length > 0) {
		Todo.findOneAndUpdate({ todoId: req.params.id }, updates)
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
	} else {
		sendErrorResponse(
			new ErrorResponse(406, "Unsuccessful", "Changes not acceptable."),
			res
		);
	}
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
