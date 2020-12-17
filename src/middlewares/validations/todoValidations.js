const ErrorResponse = require("../../models/ErrorResponse");
const Todo = require("../../models/Todo");
const sendErrorResponse = require("../responses/errorResponse");
const selectProperties =
	"todoid todoTitle todoContent todoCompleted sharedWith createdAt updatedAt -_id";

const checkTodoExists = (req, res, next) => {
	if (req.params.id) {
		Todo.findOne({ todoId: req.params.id })
			.select(selectProperties)
			.then((result) => {
				if (result) {
					req.currentTodo = result;
					next();
				} else {
					return sendErrorResponse(
						new ErrorResponse(404, "Unsuccessful", "Todo not found"),
						res
					);
				}
			});
	} else {
		return sendErrorResponse(
			new ErrorResponse(400, "Unsuccessful", "Invalid parameter ID"),
			res
		);
	}
};

const checkUpdateValidations = (req, res, next) => {
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
	if (!Object.keys(updates).length > 0) {
		return sendErrorResponse(
			new ErrorResponse(406, "Unsuccessful", "Changes not acceptable."),
			res
		);
	}
	req.updates = updates;
	next();
};

module.exports = { checkTodoExists, checkUpdateValidations };
