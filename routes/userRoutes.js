const express = require("express");
const {
  registerUser,
  loginUser,
  deleteUser,
  updateUser,
  getAllUsers,
} = require("../controllers/userController");
const { auth } = require("../middlewares/auth");

const router = express.Router();
router.route("/").get(getAllUsers);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/delete-user").delete(auth, deleteUser);
router.route("/update-user").patch(auth, updateUser);
module.exports = router;
