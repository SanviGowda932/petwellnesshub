const mongoose = require('mongoose');
// CONFLICT START A
const appointmentSchema = new mongoose.Schema({
petName: String,
ownerName: String,
date: Date,
serviceType: String,
});
module.exports = mongoose.model('Appointment', appointmentSchema);
// CONFLICT MIDDLE

const appointmentSchema = new mongoose.Schema({
  petName: String,
  ownerName: String,
  date: Date,
  serviceType: String,
});

module.exports = mongoose.model('Appointment', appointmentSchema);
// CONFLICT END B