const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  _id: { type: Number},
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  sold: { type: Boolean, required: true },
  dateOfSale: { type: Date }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;