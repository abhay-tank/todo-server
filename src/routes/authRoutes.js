const express = require("express");
const {
  checkConfirmPassword,
  hashPassword,
  checkUserExists,
} = require("../middlewares/validations/authValidations");
const authRoutes = express.Router();
const {
  signUp,
  signIn,
  changePassword,
  signOut,
} = require("../controllers/authController");
authRoutes.route("/signup").post(checkConfirmPassword, hashPassword, signUp);
authRoutes.route("/signIn").post(checkUserExists, signIn);
authRoutes.route("/changePassword").patch(changePassword);
authRoutes.route("/signOut").get(signOut);

module.exports = authRoutes;
