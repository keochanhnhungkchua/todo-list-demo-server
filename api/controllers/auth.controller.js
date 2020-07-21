var jwt = require("jsonwebtoken");
var User = require("../../models/user.model");

var bcrypt = require("bcrypt");

module.exports.postLogin = async (req, res) => {
  
  const email = req.body.email;
  const password = req.body.password;

  
  const user = await User.findOne({ email: email });
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
  const match = await bcrypt.compare(password, user.password);
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
  const token = jwt.sign({ id: user.id, name: user.name, isAdmin: user.isAdmin, avatar:user.avatar, key:process.env.SECRET }, process.env.SECRET_COOKIES,{ expiresIn: '1w' });
  return res.json({
    success:'true',
    token:token
  })
};


module.exports.postRegister = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  // const newUser = new User({
  //   user,
  //   text
  // });
  //await newUser.save();

  return res.json({
    save: "success"
  });
};