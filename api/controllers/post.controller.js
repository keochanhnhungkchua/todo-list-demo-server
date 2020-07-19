var Post = require("../../models/post.model");
var jwt = require('jsonwebtoken');

module.exports.postAdd = async (req, res) => {
  const token = req.header('Authorization').slice(7);
  var decoded = jwt.decode(token, {complete: true});
  //const posts = await Post.find();
  //res.json(posts);

  return res.json({
    success: "true transactions 123"
  });
};
