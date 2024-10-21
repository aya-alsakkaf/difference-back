const { Schema, model } = require('mongoose');
const Capitalise = require("../utils/Capitalise")
const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true, set: (v)=>Capitalise(v) },
  lastName: { type: String, required: true, set: (v)=>Capitalise(v) },
  password: { type: String, required: true },
  role: { type: String, required: true, set: (v)=>v.toLowerCase() },
  image: { type: String },
  inventions: [{ type: Schema.Types.ObjectId, ref: 'Invention' }],
  investments: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
});

module.exports = model('user', UserSchema);
