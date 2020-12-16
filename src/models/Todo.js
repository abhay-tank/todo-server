const mongoose = require("mongoose");
const uniqid = require("uniqid");

const todoSchema = new mongoose.Schema(
  {
    todoId: {
      type: String,
      default: uniqid() + Date.now(),
      unique: true,
    },
    sharedWith: [
      {
        type: mongoose.ObjectId,
        ref: "User",
      },
    ],
    todoTitle: {
      type: String,
      required: [true, "Todo title is required."],
    },
    todoContent: {
      type: String,
      required: [true, "Todo content is required."],
    },
    todoCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// todoSchema.pre("save", function (next) {
// 	console.log("Before saving middleware");
// 	console.log(this);
// 	next();
// });

let Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
