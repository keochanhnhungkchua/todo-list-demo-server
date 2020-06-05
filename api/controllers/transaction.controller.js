
var Transaction = require("../../models/transaction.model");

module.exports.index =async (req, res) => {
  console.log( res.locals.user)
  const transactions = await Transaction.find()
  res.json(transactions)
};
