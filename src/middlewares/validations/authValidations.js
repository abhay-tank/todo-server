const bcrypt = require("bcrypt");
const sendErrorResponse = require("../responses/errorResponse");
const ErrorResponse = require("../../models/ErrorResponse");
const sendSuccessResponse = require("../responses/successResponse");
const hashString = require("../../helpers/hashString");
const { config } = require("../../configuration/config");
const User = require("../../models/User");
const { verifyToken } = require("../../helpers/jwtTokenFunctions");
const strongRegexPassword = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);
const strongRegexEmail = new RegExp(
  "^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$"
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
  if (!strongRegexPassword.test(req.body.password)) {
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
    req.body.password = hashedPassword;
    next();
  } catch (error) {
    console.error(error);
    sendErrorResponse(
      new ErrorResponse(400, "Unsuccessful", error.toString()),
      res
    );
  }
};

const validatePasswordFormat = (req, res, next) => {
  if (!req.body.password.trim().length) {
    return sendErrorResponse(
      new ErrorResponse(400, "Unsuccessful", "password cannot be empty"),
      res
    );
  }
  if (!strongRegexPassword.test(req.body.password)) {
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

const validateEmailFormat = (req, res, next) => {
  let validationArray = ["email", "password"];
  let keysExists = validationArray.every((key) => req.body[key]);
  if (!keysExists) {
    return sendErrorResponse(
      new ErrorResponse(
        400,
        "Unsuccessful",
        "Email or password not present in request"
      ),
      res
    );
  }
  if (!req.body.email.trim().length) {
    return sendErrorResponse(
      new ErrorResponse(400, "Unsuccessful", "Email cannot be empty"),
      res
    );
  }
  if (!strongRegexEmail.test(req.body.email.toLowerCase())) {
    return sendErrorResponse(
      new ErrorResponse(400, "Unsuccessful", "Invalid email format"),
      res
    );
  }
  next();
};

const checkUserExists = async (req, res, next) => {
  if (req.path == "/signUp") {
    User.findOne({ email: req.body.email })
      .select(
        "uid email firstName lastName accountVerified accountVerificationToken  -_id"
      )
      .then((result) => {
        if (result) {
          return sendErrorResponse(
            new ErrorResponse(403, "Unsuccessful", "User already exists"),
            res
          );
        } else {
          next();
        }
      })
      .catch((err) => {
        console.error("Error ==>", err);
        return sendErrorResponse(
          new ErrorResponse(500, "Unsuccessful", "Error checking user exists."),
          res
        );
      });
  } else {
    User.findOne({ email: req.body.email })
      .then((result) => {
        if (result) {
          req.currentUser = result;
          next();
        } else {
          return sendErrorResponse(
            new ErrorResponse(401, "Unsuccessful", "User not registered"),
            res
          );
        }
      })
      .catch((err) => {
        return sendErrorResponse(
          new ErrorResponse(500, "Unsuccessful", "Error checking user exists."),
          res
        );
      });
  }
};

const checkAuthHeader = async (req, res, next) => {
  if (req.headers.authorization) {
    let jwtToken = req.headers.authorization.split(" ")[1];
    let decoded;
    try {
      decoded = await verifyToken(jwtToken, config.JWT_SECRET);
      User.findOne({ email: decoded.email })
        .then((result) => {
          if (result) {
            req.currentUser = result;
            return sendSuccessResponse(
              202,
              "Successful",
              [
                {
                  jwt: jwtToken,
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
          } else {
            return next();
          }
        })
        .catch((err) => {
          console.error("Error ==>", err);
          return sendErrorResponse(
            new ErrorResponse(
              500,
              "Unsuccessful",
              "Error while verifying header"
            ),
            res
          );
        });
    } catch (err) {
      console.error("Error ==>", err);
      return sendErrorResponse(
        new ErrorResponse(401, "Unsuccessful", "Invalid Token"),
        res
      );
    }
  } else {
    next();
  }
};

const validatePassword = async (req, res, next) => {
  bcrypt
    .compare(req.body.password, req.currentUser.password)
    .then((result) => {
      if (!result) {
        return sendErrorResponse(
          new ErrorResponse(401, "Unsuccessful", "Wrong password."),
          res
        );
      }
      next();
    })
    .catch((err) => {
      console.error("ERROR ===>", err);
      return sendErrorResponse(
        new ErrorResponse(500, "Unsuccessful", "Error comparing passwords."),
        res
      );
    });
};

module.exports = {
  checkUserExists,
  checkAuthHeader,
  validatePasswordFormat,
  validateEmailFormat,
  checkConfirmPassword,
  hashPassword,
  validatePassword,
};
