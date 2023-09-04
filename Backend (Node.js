// Modify the route to update availability
router.put('/update-availability/:consultantId', async (req, res) => {
  const { consultantId } = req.params;
  const { workingHours, breaks, daysOff } = req.body;

  try {
    const consultant = await Consultant.findById(consultantId);
    if (!consultant) {
      return res.status(404).json({ error: 'Consultant not found.' });
    }

    consultant.workingHours = workingHours;
    consultant.breaks = breaks;
    consultant.daysOff = daysOff;

    await consultant.save();

    res.status(200).json({ message: 'Availability updated successfully.' });
  } catch (error) {
    console.error('Error updating availability:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});
