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
  imageUrl: {
    type: String,
    default:
      "https://cdn.glitch.com/1efbf7e2-61ae-47c1-b0b6-c9e2715b61d6%2Fngay-ngat-sac-hoa-anh-dao-sydney.jpg"
  },
  like: {
    userLike: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      autopopulate: { select: "_id name avatar" }
    },
    likeAt: {
      type: Date,
      default: Date.now
    }
  },
  comment: {
    userComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      autopopulate: { select: "_id name avatar" }
    },
    commenttText: {
      type: String
    },
    commentAt: {
      type: Date,
      default: Date.now
    }
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
