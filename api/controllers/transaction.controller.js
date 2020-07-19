var Transaction = require("../../models/transaction.model");

module.exports.postAdd = async (req, res) => {
  const transactions = await Transaction.find();
  res.json(transactions);

//   return res.json({
//     success: "true transactions",
//     transactions: transactions
//   });
};
