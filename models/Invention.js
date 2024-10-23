const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InventionSchema = new Schema({
  inventors: [{ type: Schema.Types.ObjectId, ref: "User" }],
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String }],
  cost: { type: String, required: true },
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  category: { type: Schema.Types.ObjectId, ref: "Category" },
});

module.exports = mongoose.model("Invention", InventionSchema);
