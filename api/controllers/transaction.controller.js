var jwt = require('jsonwebtoken');
var Transaction = require("../../models/transaction.model");

module.exports.index =async (req, res) => {
  // const transactions = await Transaction.find()
  // res.json(transactions)
  
  
 return res.json({
    success:'true transactions',
  })
};

function veryfiToken(req, res, next){
  const token = req.header('Authorization').slice(6);
  if(!token) return res.status(400).json('Access denied')
  try{
    const verified = jwt.verify(token, process.env.SECRET_COOKIES)
    req.user=verified
    next();
  }catch(error){
    return res.status(400).send('Invalid token')

  }
}