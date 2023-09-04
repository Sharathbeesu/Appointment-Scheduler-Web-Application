// src/components/ConsultantAvailability.js
import React, { useState } from 'react';
import axios from 'axios';

function ConsultantAvailability() {
  const [workingHours, setWorkingHours] = useState('9:00 AM - 5:00 PM');
  const [breaks, setBreaks] = useState([]);
  const [daysOff, setDaysOff] = useState([]);

  const handleUpdateAvailability = async () => {
    try {
      const consultantId = 'consultant123'; // Example consultant ID
      const updatedAvailability = {
        workingHours,
        breaks,
        daysOff,
      };

      // Send a PUT request to the backend to update availability.
      const response = await axios.put(`/api/update-availability/${consultantId}`, updatedAvailability);

      if (response.status === 200) {
        alert('Availability updated successfully!');
      }
    } catch (error) {
      console.error('Error updating availability:', error);
      alert('Failed to update availability. Please try again.');
    }
  };

  return (
    <div className="availability-management">
      <h2>Availability Management</h2>
      <label>
        Working Hours:
        <input type="text" value={workingHours} onChange={(e) => setWorkingHours(e.target.value)} />
      </label>
      {/* Add fields for managing breaks and days off */}
      {/* ... */}
      <button onClick={handleUpdateAvailability}>Update Availability</button>
    </div>
  );
}

export default ConsultantAvailability;
