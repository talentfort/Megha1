const mongoose = require('mongoose');

const doctorstockSchema = new mongoose.Schema({
  productName: { type: String },
  quantity: { type: Number, default: 0 },
  pharmacyName: { type: String },
  pharmacyMail: { type: String },
  timestamp: { type: Date, default: Date.now }, // Include the timestamp field
});

const DoctorStock = mongoose.model('DoctorStock', doctorstockSchema);

module.exports = DoctorStock;
