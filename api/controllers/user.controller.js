var Post = require("../../models/post.model");
var jwt = require("jsonwebtoken");

module.exports.postLike = async (req, res) => {
  const userId = req.body.userId;
  const postId = req.body.postId;
  const posts = await Post.findById(postId);
if(!posts.like.length){
  const posts = await Post.findByIdAndUpdate(postId,  { $set: { like: [userId] }});
}
  // const newPost = new Post({
  //   user,
  //   text
  // });
  // await newPost.save();

  return res.json(posts);
};

// //get all post
// module.exports.index = async (req, res) => {
//   const posts = await Post.find().sort({ createdAt: -1 }).limit(20);
//   res.json(posts);
// };
// //get by userId
// module.exports.userId = async (req, res) => {
//   const userId = req.params.id;
//   const posts = await Post.find({ user: userId }).sort({ createdAt: -1 });
//   res.json(posts);
// };
//const posts = await Post.findByIdAndUpdate(postId);