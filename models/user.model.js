var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  name : String,
  email: String,
  password: String,
  avtar : String,
  wrongLoginCount:{
    type : String,
    default: 0
  } ,
  isAdmin: Boolean
});
 module.exports = mongoose.model("User", userSchema);