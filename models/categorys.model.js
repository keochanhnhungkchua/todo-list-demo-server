const mongoose = require("mongoose");

const categorysSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Categorys", categorysSchema);
