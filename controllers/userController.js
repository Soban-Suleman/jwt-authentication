const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Get All users
exports.getAllUsers = async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json({ results: data.length, data });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Register a User
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userByEmail = await User.findOne({ email });
    if (userByEmail) {
      return res.status(401).json({ message: "Email Already Registered" });
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashPassword,
    });
    res.json({ message: "Success", user });
  } catch (err) {
    res.json({
      status: "Fail",
      message: err.message,
    });
  }
};

//Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.json({
        message:
          "Login Information Provided is not Correct, check Your Email/Password and try again",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    res.header("auth-token", token).send(token);
    // res.json({ message: "Login SuccessFull" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Deleting a logged in user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    if (!user) {
      return res.json({
        message: "You do not have access or User does not exist",
      });
    }
    await User.findByIdAndDelete(req.user.id);
    res.status(500).json({ message: "User Deleted" });
  } catch (error) {}
};

//Updating user info
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    if (!user) {
      return res.json({
        message: "You do not have access or User does not exist",
      });
    }
    await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
    res.status(200).json({ message: "User Updated" });
  } catch (error) {}
};

//Forgot password
exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: "Email Do not exist" });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    user.resetPasswordToken = token;
    user.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
    res.json({ message: "Forgot password", token });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Resetting password
