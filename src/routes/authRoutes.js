const express = require("express");
const {
	checkUserExists,
	validatePasswordFormat,
	validateEmailFormat,
	checkConfirmPassword,
	hashPassword,
	validatePassword,
} = require("../middlewares/validations/authValidations");
const authRoutes = express.Router();
const {
	signUp,
	signIn,
	changePassword,
	signOut,
} = require("../controllers/authController");
authRoutes
	.route("/signup")
	.post(
		validateEmailFormat,
		validatePasswordFormat,
		checkConfirmPassword,
		hashPassword,
		signUp
	);
authRoutes
	.route("/signIn")
	.post(
		validateEmailFormat,
		checkUserExists,
		validatePasswordFormat,
		validatePassword,
		signIn
	);
// authRoutes.route("/changePassword").patch(changePassword);
// authRoutes.route("/signOut").get(signOut);

module.exports = authRoutes;
