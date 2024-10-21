const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InventionSchema = new Schema({
inventors: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  price: { type: Number, required: true },
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  category: { type: Schema.Types.ObjectId, ref: 'Category' }
});

module.exports = mongoose.model('invention', InventionSchema);

