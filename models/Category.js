const { Schema, model } = require("mongoose");
const Capitalise = require("../utils/Capitalise");
const KebabCase = require("../utils/Kebab");
const CategorySchema = new Schema({
  name: { type: String, required: true, set: (v) => Capitalise(v) },
  phases: {type: Array, default: ["idea", "development", "production"], set: (v) => v.map((phase) => KebabCase(phase))},
  inventions: [{ type: Schema.Types.ObjectId, ref: "Invention" }],
});

module.exports = model("Category", CategorySchema);
