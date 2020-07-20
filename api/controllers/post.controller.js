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
    save: "success"
  });
};

//get all post
module.exports.index = async (req, res) => {
  const posts = await Post.find({ "user": { "$ne": password } });
  res.json(posts);
};
//get by userId
module.exports.userId = async (req, res) => {
  // const token = req.header("Authorization").slice(7);
  // const userId = jwt.decode(token, { complete: true }).payload.id;
  const userId = req.body.userId;
  const posts = await Post.find({ user: userId });
  res.json(posts);
};
