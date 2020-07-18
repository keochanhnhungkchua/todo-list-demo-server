var express = require("express");
var router = express.Router();
var controller = require("../controllers/transaction.controller");
var jwt = require('jsonwebtoken');

// router.get("/", controller.index);
// module.exports = router;


function veryfiToken(req, res, next){
  const token = req.header('Authorization').slice(6);
  if(!token) return res.status(400).json('Access denied')
  try{
    const verified = jwt.verify(token, process.env.SECRET_COOKIES)
    process.env.SECRET=verified.key;
    next();
  }catch(error){
    return res.status(400).send('Invalid token 123')

  }
}

router.post("/",veryfiToken, controller.index);
module.exports = router;
