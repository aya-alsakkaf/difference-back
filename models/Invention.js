const mongoose = require("mongoose");
const Capitalise = require("../utils/Capitalise");
const Schema = mongoose.Schema;

const InventionSchema = new Schema({
  inventors: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  name: {
    type: String,
    required: true,
    unique: true,
    set: (v) => Capitalise(v),
  },
  description: { type: String, required: true },
  images: [{ type: String, required: true }],
  cost: { type: Number, required: true },
  phase: { type: String, required: true },
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  category: { type: Schema.Types.ObjectId, ref: "Category" },
});

module.exports = mongoose.model("Invention", InventionSchema);
