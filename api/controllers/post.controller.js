var Post = require("../../models/post.model");
var jwt = require("jsonwebtoken");

module.exports.postAdd = async (req, res) => {
  const token = req.header("Authorization").slice(7);
  const user = jwt.decode(token, { complete: true }).payload.id;
  const text = req.body.text.trim();

  const newPost = new Post({
    user,
    text
  });
  await newPost.save();

  return res.json(newPost);
};

//get all post
module.exports.index = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 }).limit(10);
  res.json(posts);
};
//get by userId
module.exports.userId = async (req, res) => {
  const userId = req.params.id;
  const posts = await Post.find({ user: userId }).sort({ createdAt: -1 });
  res.json(posts);
};
