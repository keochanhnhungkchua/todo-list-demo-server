var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: {
    type: String,
    default:"$2b$10$Pbug69.D3bBzKZZNSmVxH.Ag2OrCB7nMnzhtSVI6ylycWexS1Pcp6"
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
  }
});
module.exports = mongoose.model("User", userSchema);
