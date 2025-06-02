const mongoose = require('mongoose');
<<<<<<< HEAD
const appointmentSchema = new mongoose.Schema({
petName: String,
ownerName: String,
date: Date,
serviceType: String,
});
module.exports = mongoose.model('Appointment', appointmentSchema);
=======

const appointmentSchema = new mongoose.Schema({
  petName: String,
  ownerName: String,
  date: Date,
  serviceType: String,
});

module.exports = mongoose.model('Appointment', appointmentSchema);
>>>>>>> 364184bbd8880d82ad510bb217841bd649f080e6
