const mongoose = require("mongoose");
const uniqid = require("uniqid");

const UserSchema = mongoose.Schema({
  uid: {
    type: String,
    default: uniqid(),
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
    validate: {
      validator: function () {},
    },
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  accountVerified: {
    type: Boolean,
    default: false,
  },
  accountVerificationToken: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = UserSchema;
