const mongoose = require("mongoose");

const User = require("./user.model");

const postSchema = new mongoose.Schema({
  user:  { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true ,
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
postSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model("Post", postSchema);
 