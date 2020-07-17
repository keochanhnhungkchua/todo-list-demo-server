var jwt = require("jsonwebtoken");
var User = require("../../models/user.model");

const bcrypt = require("bcrypt");

module.exports.postLogin = async (req, res) => {
  
  var email = req.body.email;
  var password = req.body.password;

  
  var user = await User.findOne({ email: email });
  if (!user) {
    const errors = ["User does not exist"];

    return res.status(404).json(errors);
  }
  //check wrong login
  if (user.wrongLoginCount > 3) {
    const errors = ["User wrong login > 3"];

    return res.status(404).json(errors);
  }
  //check pass
  var match = await bcrypt.compare(password, user.password);
  if (!match) {
    user.wrongLoginCount = user.wrongLoginCount + 1;
    await user.save();
    const errors = ["Wrong password"];

    return res.status(404).json(errors);
  }
  user.wrongLoginCount = 0;
  await user.save();
  //create cookie
  // res
  //   .cookie("userId", user.id, { signed: true })
  //   .json({ id: user.id, name: user.name, isAdmin: user.isAdmin, avatar:user.avatar });
  var token = jwt.sign({ id: user.id }, "shhhhh");
  return res.json({
    success:'true',
    token:token
  })
};
