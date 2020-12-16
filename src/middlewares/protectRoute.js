const { config } = require("../configuration/config");
const User = require("../models/User");

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
	} catch (err) {
		return sendErrorResponse(
			new ErrorResponse(401, "Unsuccesssul", "Invalid Token"),
			res
		);
	}
	User.findOne({ email: decoded.email })
		.select(
			"uid firstName lastName email accountVerified accountVerificationToken -_uid"
		)
		.then((result) => {
			req.currentUser = result;
			next();
		})
		.catch((err) => {
			return sendErrorResponse(
				new ErrorResponse(401, "Unsuccesssul", "User not registered"),
				res
			);
		});
};

module.exports = protectRoute;
