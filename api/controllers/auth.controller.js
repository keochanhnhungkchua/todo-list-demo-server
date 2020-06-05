var User = require("../../models/user.model");

const bcrypt = require("bcrypt");

module.exports.postLogin = async (req, res) => {
  var email = res.locals.email;
  var password = res.locals.password;
  console.log(email)
    //console.log(password)

  var user = await User.findOne({ email: email });
  if (!user) {
    const errors = ["User does not exist"];
    res.status(404).json(errors);
    return;
  }
  //check wrong login
  if (user.wrongLoginCount > 3) {
    const errors = ["User wrong login > 3"];
    res.status(404).json(errors);
    return;
  }
  //check pass
  var match = await bcrypt.compare(password, user.password);
  if (!match) {
    user.wrongLoginCount = user.wrongLoginCount + 1;
    await user.save();
    const errors = ["Wrong password"];
    res.status(404).json(errors);
    return;
  }
  user.wrongLoginCount = 0;
  await user.save();
  //create cookie
  res
    .cookie("userId", user.id, { signed: true })
    .json({ id: user.id, name: user.name, isAdmin: user.isAdmin });
};
