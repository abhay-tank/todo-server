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
  console.log("Creating new Todo");
  let todo = new Todo({
    todoTitle: req.body.todoTitle,
    todoContent: req.body.todoContent,
  });
  console.log(todo);
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
      if (req.body[key].trim().length > 0) {
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
  if (updates) {
    Todo.findOneAndUpdate({ todoId: req.params.id }, updates)
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
  }
};

// DELETE:id
const deleteTodo = (req, res) => {
  Todo.findOneAndDelete({ todoId: req.params.id })
    .then((result) => {
      console.log(result);
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
      console.log(err);
      sendErrorResponse(
        new ErrorResponse(500, "Unsuccessful", err.toString()),
        res
      );
    });
};

module.exports = { getAllTodos, createTodo, getTodo, updateTodo, deleteTodo };
