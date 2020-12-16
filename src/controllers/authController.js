const { config } = require("../configuration/config");
const sendErrorResponse = require("../middlewares/responses/errorResponse");
const ErrorResponse = require("../models/ErrorResponse");
const sendSuccessResponse = require("../middlewares/responses/successResponse");
const User = require("../models/User");
const { generateToken } = require("../helpers/jwtTokenFunctions");

// POST
const signUp = (req, res) => {
  let user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName || null,
    email: req.body.email,
    password: req.body.password,
  });
  user
    .save()
    .then((result) => {
      sendSuccessResponse(200, "Successful", result, res);
    })
    .catch((err) => {
      sendErrorResponse(
        new ErrorResponse(400, "Unsuccessful", err.toString()),
        res
      );
    });
};
// POST
const signIn = async (req, res) => {
  let token = await generateToken(
    { email: req.currentUser.email },
    config.JWT_SECRET
  );
  res.cookie("jwt", token);
  sendSuccessResponse(
    202,
    "Successful",
    [
      {
        jwt: token,
      },
      {
        uid: req.currentUser.uid,
        firstName: req.currentUser.firstName,
        lastName: req.currentUser.lastName,
        email: req.currentUser.email,
        accountVerified: req.currentUser.accountVerified,
      },
    ],
    res
  );
};
// PATCH
const changePassword = (req, res) => {
  res.send("Patch");
};
// GET
const signOut = (req, res) => {
  res.send("SignOut");
};

module.exports = { signUp, signIn, changePassword, signOut };
