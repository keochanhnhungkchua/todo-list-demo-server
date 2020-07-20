const mongoose = require("mongoose");

const User = require("./user.model");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    autopopulate: { select: "_id name avatar" },
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
postSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("Post", postSchema);

// const randomSchema = mongoose.Schema({
//   name: {type: String,trim: true},
//   username: {type: String,trim: true},
//   enemies: {
//     type: ObjectId,
//     ref: randomMongooseModel,
//     autopopulate:{
//       select: '-password -randonSensitiveField' // remove listed fields from selection
//     }
//   },
//   friends: {
//     type: ObjectId,
//     ref: randomMongooseModel,
//     autopopulate:{
//       select: '_id name email username' // select only listed fields
//     }
//   }
//https://stackoverflow.com/questions/26915116/mongoose-mongodb-exclude-fields-from-populated-query-data
// });
