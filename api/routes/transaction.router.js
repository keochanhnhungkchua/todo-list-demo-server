var express = require("express");
var router = express.Router();
var controller = require("../controllers/transaction.controller");
var jwt = require('jsonwebtoken');

function veryfiToken(req, res, next){
  const token = req.header('Authorization');
  if(!token) { return res.status(400).send('Access denied 123')};
  try{
    const verified = jwt.verify(token.slice(7), process.env.SECRET_COOKIES)
    process.env.SECRET=verified.key;
    next();
  }catch(error){
    return res.status(400).send('Invalid token 123')

  }
}
//index post
router.post("/",veryfiToken, controller.index);

module.exports = router;
