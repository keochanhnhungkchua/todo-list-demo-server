var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default:
      "https://res.cloudinary.com/keochanhnhungkchua/image/upload/v1590285910/ocuhhvnjaflr8ceppo2s.png"
  },
  wrongLoginCount: {
    type: Number,
    default: 0
  },
 isAdmin:{
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model("User", userSchema);
