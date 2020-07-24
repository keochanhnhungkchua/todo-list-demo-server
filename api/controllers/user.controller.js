var Post = require("../../models/post.model");
var jwt = require("jsonwebtoken");

module.exports.postLike = async (req, res) => {
  const userId = req.body.userId;
  const postId = req.body.postId;
  const post = await Post.findById(postId);
  
  if (!post.like.length) {
    const posts = await Post.findByIdAndUpdate(
      postId,
      { $set: { like: [userId] } },
      { new: true }
    );
    return res.json(posts);
  } else {
    const like = post.like;
    const index = like.indexOf(userId);
    if (index) {
      const newLike = [...like.slice(0, index), ...like.slice(index + 1)];
      const posts = await Post.findByIdAndUpdate(
        postId,
        { $set: { like: newLike } },
        { new: true }
      );
      return res.json(posts);
    } else {
      const newLike = [...like, userId];
      const posts = await Post.findByIdAndUpdate(
        postId,
        { $set: { like: newLike } },
        { new: true }
      );
      return res.json(posts);
    }
  }
  // const newPost = new Post({
  //   user,
  //   text
  // });
  // await newPost.save();
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
