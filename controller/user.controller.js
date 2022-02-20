const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
//add new user
module.exports.index = async (req, res) => {
  try {
    const users = await User.find().select("-__v -password -role");
    res.json({ success: true, users });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

module.exports.deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    await User.findByIdAndDelete(userId);
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

module.exports.editUser = async (req, res) => {
  const { password } = req.body;
  let newUser = { ...req.body };
  if (password) {
    newPassword = await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    newUser = { ...req.body, password: newPassword };
  }
  try {
    const { userId } = req.params;
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { $set: newUser },
      { new: true }
    ).select("-__v -password -role");
    res.json({ success: true, user: updateUser });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
