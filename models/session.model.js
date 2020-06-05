var mongoose = require("mongoose");

var sessionSchema = new mongoose.Schema({
  sessionId: String,
  cart: {
    type: Object,
    default: {}
  }
});
module.exports = mongoose.model("Session", sessionSchema, "sessions");
