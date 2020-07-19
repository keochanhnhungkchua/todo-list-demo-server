const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: Object,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Post", postSchema);
