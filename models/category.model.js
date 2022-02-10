const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema(
  {
    name: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Categories", categoriesSchema);
