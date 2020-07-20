var Post = require("../../models/post.model");
var jwt = require("jsonwebtoken");

module.exports.postAdd = async (req, res) => {
  const token = req.header("Authorization").slice(7);
  const text = req.body.text.trim();
  const decoded = jwt.decode(token, { complete: true });

  //const posts = await Post.find();
  //res.json(posts);

  return res.json({
    success: decoded.payload,
    text: text
  });
};

//get all post
module.exports.index = async (req, res) => {
  // var posts = await Post.find();
  // res.json(posts );
  return res.json({
    success: 'decoded.payload'
    
  });
};