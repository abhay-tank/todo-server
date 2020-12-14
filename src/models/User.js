const mongoose = require("mongoose");
const uniqid = require("uniqid");

const userSchema = new mongoose.Schema(
	{
		uid: {
			type: String,
			default: uniqid(),
			required: true,
			unique: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			minLength: 8,
		},
		accountVerified: {
			type: Boolean,
			default: false,
		},
		accountVerificationToken: {
			type: String,
		},
	},
	{ timestamp: true }
);

let User = mongoose.model("User", userSchema);

module.exports = User;
