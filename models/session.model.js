var mongoose = require("mongoose");

var sessionSchema = new mongoose.Schema({
  sessionId : String,
  cart: Object
});
module.exports = mongoose.model("Session", sessionSchema, 'sessions');