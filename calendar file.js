// routes/calendarRoutes.js
const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment'); // Import your appointment model

router.get('/available-time-slots', async (req, res) => {
  try {
    const selectedDate = new Date(req.query.date); // Get the selected date from the query parameter
    const availableTimeSlots = await Appointment.find({ date: selectedDate, status: 'available' });
    res.json(availableTimeSlots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch available time slots' });
  }
});

module.exports = router;
