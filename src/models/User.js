const uniqid = require("uniqid");

class User {
	constructor(firstName, lastName, email, password) {
		this.uid = uniqid();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.emailVerified = false;
		this.emailVerificationToken = "";
		this.createdAt = Date.now();
	}
}

module.exports = User;
