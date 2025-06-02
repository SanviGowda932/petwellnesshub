const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../auth');
router.get('/dashboard-data', authenticateToken, authorizeRoles('admin'), (req, res) => {
res.json({ message: 'Admin dashboard data', stats: { users: 42, appointments: 128 } });
});
router.get('/history', authenticateToken, (req, res) => {
res.json({ message: 'User appointment history', history: [{ date: '2024-10-10', type: 'Check-up' }] });
});
module.exports = router;