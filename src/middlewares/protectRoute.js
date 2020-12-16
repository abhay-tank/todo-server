const { config } = require("../configuration/config");
const User = require("../models/User");
const sendErrorResponse = require("../middlewares/responses/errorResponse");
const ErrorResponse = require("../models/ErrorResponse");
const { verifyToken } = require("../helpers/jwtTokenFunctions");
const protectRoute = async (req, res, next) => {
  //   console.log("headers in req body", req.headers.authorization);
  // extract token
  if (!req.headers.authorization) {
    return sendErrorResponse(
      new ErrorResponse(401, "Unsuccessful", "Please login or signup"),
      res
    );
  }
  // if headers are there
  let jwtToken = req.headers.authorization.split(" ")[1];
  let decoded;
  try {
    decoded = await verifyToken(jwtToken, config.JWT_SECRET);
    console.log(decoded);
  } catch (err) {
    console.log(err);
    return sendErrorResponse(
      new ErrorResponse(401, "Unsuccesssul", "Invalid Token"),
      res
    );
  }
  User.findOne({ email: decoded.email })
    .then((result) => {
      if (result) {
        req.currentUser = {
          uid: result.uid,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          accountVerified: result.accountVerified,
        };
        next();
      } else {
        return sendErrorResponse(
          new ErrorResponse(401, "Unsuccessful", "Signup / SignIn first"),
          res
        );
      }
    })
    .catch((err) => {
      console.error(err);
      return sendErrorResponse(
        new ErrorResponse(401, "Unsuccessful", "User not registered"),
        res
      );
    });
};

module.exports = protectRoute;
