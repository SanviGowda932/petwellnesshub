const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
<<<<<<< HEAD
const dotenv = require('dotenv');
const Appointment = require('./models/Appointment');
const { authenticateToken, authorizeRoles } = require('./middleware/auth');
const sendConfirmationEmail = require('./mailer');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI, {
useNewUrlParser: true,
useUnifiedTopology: true
}).then(() => {
console.log('✅ MongoDB connected');
}).catch(err => {
console.error('❌ MongoDB connection error:', err);
});
app.post('/api/book', async (req, res) => {
const { name, email, date, service, petName } = req.body;
if (!name || !email || !date || !service || !petName) {
return res.status(400).json({ error: 'Missing required fields' });
}
try {
const newAppointment = new Appointment({ name, email, date, service, petName });
await newAppointment.save();
sendConfirmationEmail(email, { date, service, petName });
res.status(200).json({ message: 'Booking complete. Email sent!' });
} catch (err) {
res.status(500).json({ error: err.message });
}
});
app.post('/api/appointments', authenticateToken, authorizeRoles('admin'), async (req, res) => {
try {
const appointment = new Appointment(req.body);
await appointment.save();
res.status(201).json(appointment);
} catch (err) {
res.status(400).json({ error: err.message });
}
});
app.get('/api/appointments', authenticateToken, authorizeRoles('admin'), async (req, res) => {
const { search, status, paymentStatus } = req.query;
let filter = {};
if (search) {
const regex = new RegExp(search, 'i');
filter.$or = [
{ petName: regex },
{ petOwner: regex },
{ service: regex }
];
}
if (status) filter.status = status;
if (paymentStatus) filter.paymentStatus = paymentStatus;
try {
const appointments = await Appointment.find(filter);
res.json(appointments);
} catch (err) {
res.status(500).json({ error: err.message });
}
});
app.get('/api/appointments/:id', authenticateToken, authorizeRoles('admin'), async (req, res) => {
try {
const appointment = await Appointment.findById(req.params.id);
if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
res.json(appointment);
} catch (err) {
res.status(500).json({ error: err.message });
}
});
app.patch('/api/appointments/:id/status', authenticateToken, authorizeRoles('admin'), async (req, res) => {
const { status } = req.body;
try {
const appointment = await Appointment.findByIdAndUpdate(
req.params.id,
{ status },
{ new: true }
);
if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
res.json(appointment);
} catch (err) {
res.status(500).json({ error: err.message });
}
});
app.patch('/api/appointments/:id/payment', authenticateToken, authorizeRoles('admin'), async (req, res) => {
const { paymentStatus } = req.body;
try {
const appointment = await Appointment.findByIdAndUpdate(
req.params.id,
{ paymentStatus },
{ new: true }
);
if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
res.json(appointment);
} catch (err) {
res.status(500).json({ error: err.message });
}
});
app.use('/api/dashboard-data', authenticateToken, authorizeRoles('admin'), require('./routes/dashboard'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`🚀 Server running on http:
});

// Error handler middleware
const errorHandler = require('../middlewares/errorHandler');
app.use(errorHandler);
=======
const Appointment = require('./models/Appointment.js');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/petwellnesshub', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB connected');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});
const sendConfirmationEmail = require('./mailer');

app.post('/api/book', async (req, res) => {
  const { name, email, date, service, petName } = req.body;

  const newAppointment = new Appointment({ name, email, date, service, petName });
  await newAppointment.save();

  sendConfirmationEmail(email, { date, service, petName });

  res.status(200).json({ message: 'Booking complete. Email sent!' });
});

// Create a new appointment
app.post('/api/appointments', async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all appointments with optional filters
app.get('/api/appointments', async (req, res) => {
  const { search, status, paymentStatus } = req.query;
  let filter = {};

  if (search) {
    const regex = new RegExp(search, 'i');
    filter.$or = [
      { petName: regex },
      { petOwner: regex },
      { service: regex }
    ];
  }

  if (status) filter.status = status;
  if (paymentStatus) filter.paymentStatus = paymentStatus;

  try {
    const appointments = await Appointment.find(filter);
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get one appointment
app.get('/api/appointments/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update appointment status
app.patch('/api/appointments/:id/status', async (req, res) => {
  const { status } = req.body;
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update payment status
app.patch('/api/appointments/:id/payment', async (req, res) => {
  const { paymentStatus } = req.body;
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { paymentStatus },
      { new: true }
    );
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
>>>>>>> 364184bbd8880d82ad510bb217841bd649f080e6
