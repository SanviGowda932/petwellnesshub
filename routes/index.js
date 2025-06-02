const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();
router.post('/login', async (req, res) => {
const { email, password } = req.body;
const user = await User.findOne({ email });
if (!user) return res.status(400).json({ message: 'User not found' });
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) return res.status(400).json({ message: 'Invalid password' });
const token = jwt.sign(
{ id: user._id, role: user.role },
process.env.JWT_SECRET,
{ expiresIn: process.env.JWT_EXPIRES_IN }
);
res.json({ token });
});
const apiRoutes = require('../apiController');
router.use('/api', apiRoutes);
module.exports = router;