var User = require("../models/user.model");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
// const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.postRegister = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.json({ success: false, error: { email: "Email was used!" } });
    }
    const hashPassword = await bcrypt.hashSync(
      password,
      bcrypt.genSaltSync(10)
    );
    const newUser = await User.create({ ...req.body, password: hashPassword });
    res.status(200).json({ success: true });
  } catch (error) {
    res.json(error.message);
  }
};
//check mail
module.exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    //check email
    if (!user) {
      const error = "Wrong email or password !";
      return res.json({ success: false, error: error });
    }
    //check wrong login
    if (user.wrongLoginCount > 5) {
      const error = "You were wrong login > 5 times please contact admin...";
      return res.json({ success: false, error: error });
    }
    //check pass
    if (password) {
      const match = await bcrypt.compareSync(password, user.password);
      if (!match) {
        user.wrongLoginCount = user.wrongLoginCount + 1;
        await user.save();
        const error = "Wrong email or password !";
        return res.json({ success: false, error: error });
      }
    }
    user.wrongLoginCount = 0;
    await user.save();
    //creat token
    const token = jwt.sign(
      {
        _id: user._id,
        isAdmin: user.isAdmin,
        avatar: user.avatar,
        username: user.username,
        role: user.role,
      },
      process.env.SECRET_COOKIES,
      { expiresIn: "1w" }
    );
    return res.json({
      success: "true",
      access_token: token,
      message: "",
      errorCode: 0,
    });
  } catch (error) {
    res.json(error.message);
  }
};
