const mongoose = require("mongoose");
const uniqid = require("uniqid");

const TodoSchema = mongoose.Schema({
  todoid: {
    type: String,
    default: uniqid(),
    required: true,
    unique: true,
  },
  todoTitle: {
    type: String,
    required: true,
  },
  todoContent: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = TodoSchema;
