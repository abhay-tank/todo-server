const ErrorResponse = require("../../models/ErrorResponse");
const Todo = require("../../models/Todo");
const sendErrorResponse = require("../responses/errorResponse");
const selectProperties =
  "todoid todoTitle todoContent sharedWith createdAt updatedAt -_id";
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

module.exports = { checkTodoExists };
