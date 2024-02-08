const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String,  },
  description: { type: String },
  quantity: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  pharmacyName: { type: String,  },
  pharmacyMail: { type: String,  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
