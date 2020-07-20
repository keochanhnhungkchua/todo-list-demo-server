const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user:  { type: ObjectId, ref: 'people', autopopulate: true , required: true}
   
  ,
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
postSchema.plugin(autopopulate);
module.exports = mongoose.model("Post", postSchema);
