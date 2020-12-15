const sendErrorResponse = require("../responses/errorResponse");
const ErrorResponse = require("../../models/ErrorResponse");
const sendSuccessResponse = require("../responses/successResponse");
const hashString = require("../../helpers/hashString");

const strongRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);
const checkConfirmPassword = (req, res, next) => {
  if (
    !req.body.password.trim().length ||
    !req.body.confirmPassword.trim().length
  ) {
    return sendErrorResponse(
      new ErrorResponse(
        400,
        "Unsuccessful",
        "password or confirmPassword cannot be empty"
      ),
      res
    );
  }
  if (!strongRegex.test(req.body.password)) {
    return sendErrorResponse(
      new ErrorResponse(
        400,
        "Unsuccessful",
        "Password does not meet critera of length of 8 chars or more, should contain a lowercase alphabet, should contain a uppercase alphabet, should contain a number and should have atleast one of this !,@,#,$,%,^,&,* symbol."
      ),
      res
    );
  }
  if (req.body.confirmPassword !== req.body.password) {
    return sendErrorResponse(
      new ErrorResponse(
        400,
        "Unsuccessful",
        "Password does not match confirm Password"
      ),
      res
    );
  }
  next();
};

const hashPassword = async (req, res, next) => {
  try {
    let hashedPassword = await hashString(req.body.password);
    if (hashedPassword instanceof Error) {
      throw new Error(hashedPassword);
    }
    next();
  } catch (error) {
    console.error(error);
    sendErrorResponse(
      new ErrorResponse(400, "Unsuccessful", error.toString()),
      res
    );
  }
};

const checkUserExists = (req, res, next) => {
  if (req.headers.authorization) {
    // return sendSuccessResponse(202, "Successful", );
  }
};

const validatePasswordFormat = (req, res, next) => {
  if (!req.body.password.trim().length) {
    return sendErrorResponse(
      new ErrorResponse(400, "Unsuccessful", "password cannot be empty"),
      res
    );
  }
  if (!strongRegex.test(req.body.password)) {
    return sendErrorResponse(
      new ErrorResponse(
        400,
        "Unsuccessful",
        "Password does not meet critera of length of 8 chars or more, should contain a lowercase alphabet, should contain a uppercase alphabet, should contain a number and should have atleast one of this !,@,#,$,%,^,&,* symbol."
      ),
      res
    );
  }
  next();
};
module.exports = { checkConfirmPassword, hashPassword, checkUserExists };
