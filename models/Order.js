const { Schema, model } = require("mongoose");

const OrderSchema = new Schema({
  invention: { type: Schema.Types.ObjectId, ref: "Invention" },
  percentage: { type: Number, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: "pending", set: (v) => v.toLowerCase() },
  investor: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = model("Order", OrderSchema);
