// src/components/Calendar.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';

function AppointmentCalendar() {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    // Handle date selection here
    setDate(newDate);
  };

  return (
    <div className="calendar">
      <h2>Appointment Calendar</h2>
      <Calendar
        onChange={handleDateChange}
        value={date}
        minDate={new Date()} // Ensure dates in the past cannot be selected
        // Add more calendar customization options as needed
      />
      {/* Display available time slots based on the selected date */}
    </div>
  );
  
}

// src/components/Calendar.js
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';

function AppointmentCalendar() {
  const [date, setDate] = useState(new Date());
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  useEffect(() => {
    // Fetch available time slots based on the selected date
    const fetchAvailableTimeSlots = async () => {
      try {
        const response = await fetch(`/api/calendar/available-time-slots?date=${date.toISOString()}`);
        const data = await response.json();
        setAvailableTimeSlots(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAvailableTimeSlots();
  }, [date]);

  return (
    <div className="calendar">
      <h2>Appointment Calendar</h2>
      <Calendar
        onChange={handleDateChange}
        value={date}
        minDate={new Date()}
      />
      <h3>Available Time Slots</h3>
      <ul>
        {availableTimeSlots.map((timeSlot) => (
          <li key={timeSlot._id}>{timeSlot.startTime} - {timeSlot.endTime}</li>
        ))}
      </ul>
    </div>
  );
}

export default AppointmentCalendar;
