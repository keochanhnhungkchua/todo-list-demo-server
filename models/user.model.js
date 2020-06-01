var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  name : String,
  email: String,
  password: String,
  avtar : {
    type :String,
    default:"https://res.cloudinary.com/keochanhnhungkchua/image/upload/v1590285910/ocuhhvnjaflr8ceppo2s.png"
  },
  wrongLoginCount:{
    type : Number,
    default: 0
  } ,
  isAdmin: Boolean
});
 module.exports = mongoose.model("User", userSchema);