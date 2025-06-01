const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  petName: String,
  ownerName: String,
  date: Date,
  serviceType: String,
});

module.exports = mongoose.model('Appointment', appointmentSchema);
