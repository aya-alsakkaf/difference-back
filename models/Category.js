const { Schema, model } = require('mongoose');

const CategorySchema = new Schema({
  name: { type: String, required: true },
  inventions: [{ type: Schema.Types.ObjectId, ref: 'Invention' }]
});

module.exports = model('Category', CategorySchema);
