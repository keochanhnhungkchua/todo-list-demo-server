var Post = require("../../models/post.model");
var jwt = require("jsonwebtoken");

module.exports.postAdd = async (req, res) => {
  const token = req.header("Authorization").slice(7);
  const user = jwt.decode(token, { complete: true }).payload.id;
  const text = req.body.text.trim();
  //const posts = await Post.find();
  //res.json(posts);
  const newPost = new Post({
    user,
    text
  });
  await newPost.save();
  
  return res.json({
    userId: user,
    text: text
  });
};

//get all post
module.exports.index = async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
  
};
//get by userId
module.exports.userId = async (req, res) => {
  const posts = await Post.find({ user: "5ed26ad48b71f1a732997213" });
  res.json(posts);
  
};
