const express = require("express");
const authRoutes = express.Router();
const {
  signUp,
  signIn,
  changePassword,
  signOut,
} = require("../controllers/authController");
authRoutes.route("/signup").post(signUp);
authRoutes.route("/signIn").post(signIn);
authRoutes.route("/changePassword").patch(changePassword);
authRoutes.route("/signOut").get(signOut);

module.exports = authRoutes;
