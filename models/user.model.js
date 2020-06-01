var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  name : String,
  email: String,
  password: String,
  avtar : String,
  wrongLoginCount: Number,
  isAdmin: Boolean
});
 module.exports = mongoose.model("User", userSchema);