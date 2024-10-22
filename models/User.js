const { Schema, model } = require("mongoose");
const Capitalise = require("../utils/Capitalise");
const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true, set: (v) => Capitalise(v) },
  lastName: { type: String, required: true, set: (v) => Capitalise(v) },
  password: { type: String, required: true },
  role: { type: String, required: true, set: (v) => v.toLowerCase() },
  image: { type: String }, // will make it required for inventor and investor in frontend (becuase we dont want to require the guest/enthusiast to upload an image)
  inventions: [{ type: Schema.Types.ObjectId, ref: "Invention" }],
  investments: [{ type: Schema.Types.ObjectId, ref: "Order" }],
});

module.exports = model("User", UserSchema);
