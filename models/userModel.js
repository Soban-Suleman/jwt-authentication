const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must Have a name"],
  },
  email: {
    type: String,
    required: [true, "User must have an email"],
  },
  password: {
    type: String,
    required: [true, "Use can not be registered without password"],
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

const userModel = mongoose.model("Users", UserSchema);
module.exports = userModel;
