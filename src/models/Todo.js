const mongoose = require("mongoose");
const uniqid = require("uniqid");

const todoSchema = new mongoose.Schema(
	{
		todoid: {
			type: String,
			default: uniqid(),
			unique: true,
		},
		sharedWith: [
			{
				type: mongoose.SchemaTypes.ObjectId,
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
