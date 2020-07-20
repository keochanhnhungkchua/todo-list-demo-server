var Post = require("../../models/post.model");
var jwt = require("jsonwebtoken");

module.exports.postAdd = async (req, res) => {
  const token = req.header("Authorization").slice(7);
  const userId = jwt.decode(token, { complete: true }).payload.id;
  const text = req.body.text.trim();
  //const posts = await Post.find();
  //res.json(posts);

  return res.json({
    userId: userId,
    text: text
  });
};

//get all post
module.exports.index = async (req, res) => {
  const posts = await Post.find({ user: "5ed216e730c4a1ddceaa6d0c" });
  res.json(posts);
  //   return res.json({
  //     success: 'decoded.payload'

  //   });
};
