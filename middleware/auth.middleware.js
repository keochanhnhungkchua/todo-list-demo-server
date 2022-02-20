var jwt = require("jsonwebtoken");
var User = require("../models/user.model");

module.exports.verifyToken = function (req, res, next) {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(400).send("Access denied");
  }
  try {
    const verified = jwt.verify(token.slice(7), process.env.SECRET_COOKIES);
    const currentTime = Date.now() / 1000;
    if (currentTime > verified.exp)
      return res.json({
        success: false,
        message: "Token expires ! Please login again",
      });

    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

module.exports.isAdmin = function (req, res, next) {
  const token = req.header("Authorization");
  try {
    const verified = jwt.verify(token.slice(7), process.env.SECRET_COOKIES);
    if (!verified.isAdmin)
      return res.json({ success: false, message: "Access is not allowed" });
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
