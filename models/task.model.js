const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    name: String,
    categoryId: Number,
    email: String,
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
