const express = require("express");
const {
	checkUserExists,
	checkAuthHeader,
	validatePasswordFormat,
	validateEmailFormat,
	checkConfirmPassword,
	hashPassword,
	validatePassword,
} = require("../middlewares/validations/authValidations");
const authRoutes = express.Router();
const { signUp, signIn, signOut } = require("../controllers/authController");
authRoutes
	.route("/signUp")
	.post(
		checkAuthHeader,
		validateEmailFormat,
		checkUserExists,
		validatePasswordFormat,
		checkConfirmPassword,
		hashPassword,
		signUp
	);
authRoutes
	.route("/signIn")
	.post(
		checkAuthHeader,
		validateEmailFormat,
		checkUserExists,
		validatePasswordFormat,
		validatePassword,
		signIn
	);
authRoutes.route("/signOut").get(checkAuthHeader, signOut);

module.exports = authRoutes;
