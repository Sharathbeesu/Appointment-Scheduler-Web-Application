// src/components/AvailabilityManagement.js
import React, { useState } from 'react';

function AvailabilityManagement() {
  const [workingHours, setWorkingHours] = useState({ start: '09:00 AM', end: '05:00 PM' });
  const [breaks, setBreaks] = useState([]);
  const [daysOff, setDaysOff] = useState([]);

  const handleAddBreak = () => {
    // Implement logic to add a break to the breaks array
    const newBreaks = [...breaks];
    newBreaks.push({ start: '', end: '' });
    setBreaks(newBreaks);
  };

  const handleRemoveBreak = (index) => {
    // Implement logic to remove a break at the specified index
    const newBreaks = [...breaks];
    newBreaks.splice(index, 1);
    setBreaks(newBreaks);
  };

  const handleSaveAvailability = () => {
    // Implement logic to send the availability data to the backend for storage
    const availabilityData = {
      workingHours,
      breaks,
      daysOff,
    };

    // Send a POST request to the backend to save the availability data
    fetch('/api/set-availability', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(availabilityData),
    })
      .then((response) => {
        if (response.status === 200) {
          // Handle successful save, e.g., show a confirmation message
          console.log('Availability saved successfully');
        } else {
          console.error('Error saving availability:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error saving availability:', error);
      });
  };

  return (
    <div>
      <h1>Availability Management</h1>
      <div>
        <h2>Working Hours</h2>
        <input
          type="time"
          value={workingHours.start}
          onChange={(e) => setWorkingHours({ ...workingHours, start: e.target.value })}
        />
        <span>to</span>
        <input
          type="time"
          value={workingHours.end}
          onChange={(e) => setWorkingHours({ ...workingHours, end: e.target.value })}
        />
      </div>
      <div>
        <h2>Breaks</h2>
        {breaks.map((breakTime, index) => (
          <div key={index}>
            <input
              type="time"
              value={breakTime.start}
              onChange={(e) => {
                const newBreaks = [...breaks];
                newBreaks[index].start = e.target.value;
                setBreaks(newBreaks);
              }}
            />
            <span>to</span>
            <input
              type="time"
              value={breakTime.end}
              onChange={(e) => {
                const newBreaks = [...breaks];
                newBreaks[index].end = e.target.value;
                setBreaks(newBreaks);
              }}
            />
            <button onClick={() => handleRemoveBreak(index)}>Remove</button>
          </div>
        ))}
        <button onClick={handleAddBreak}>Add Break</button>
      </div>
      <div>
        <h2>Days Off</h2>
        {/* Implement UI for selecting and adding days off */}
      </div>
      <button onClick={handleSaveAvailability}>Save Availability</button>
    </div>
  );
}

export default AvailabilityManagement;
