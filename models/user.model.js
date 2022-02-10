var mongoose = require("mongoose");

var userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/keochanhnhungkchua/image/upload/v1590285910/ocuhhvnjaflr8ceppo2s.png",
    },
    wrongLoginCount: {
      type: Number,
      default: 0,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);
