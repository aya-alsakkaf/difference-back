const { Schema, model } = require('mongoose');

const OrderSchema = new Schema({
    invention: { type: Schema.Types.ObjectId, ref: 'Invention' },
    shareCount: { type: Number, required: true },
    cost: { type: Number, required: true },
    status: { type: String, default: 'pending', set: (v)=>v.toLowerCase() },
    investor: { type: Schema.Types.ObjectId, ref: 'User' }
  });

module.exports = model('Order', OrderSchema);
