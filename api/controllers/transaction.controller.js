
var Transaction = require("../../models/transaction.model");

module.exports.index =async (req, res) => {
  // const transactions = await Transaction.find()
  // res.json(transactions)
  const data = req.header('Authorization')
  console.log(data);
 return res.json({
    success:'true transactions',
    data:data
  })
};
