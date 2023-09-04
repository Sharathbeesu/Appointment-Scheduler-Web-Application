// src/components/BookingForm.js
import React, { useState } from 'react';
import axios from 'axios';

function BookingForm() {
  const [selectedSlot, setSelectedSlot] = useState('');
  const [bookingStatus, setBookingStatus] = useState('');

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
  };

  const handleBooking = async () => {
    try {
      // Send a POST request to the backend to book the selected slot.
      const response = await axios.post('/api/book-appointment', {
        userId: 'user123', // Example user ID
        selectedSlot,
      });

      if (response.status === 200) {
        // Booking successful, clear the selected slot.
        setSelectedSlot('');
        setBookingStatus('Appointment booked successfully!');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      setBookingStatus('Failed to book the appointment. Please try again.');
    }
  };

  return (
    <div className="booking-form">
      <h2>Book an Appointment</h2>
      <div className="time-slots">
        {/* Render available time slots here */}
        <button onClick={() => handleSlotSelection('9:00 AM - 10:00 AM')}>9:00 AM - 10:00 AM</button>
        {/* ... Repeat for other available slots */}
      </div>
      {selectedSlot && (
        <div className="confirmation">
          <p>Selected Slot: {selectedSlot}</p>
          <button onClick={handleBooking}>Confirm Booking</button>
        </div>
      )}
      <p>{bookingStatus}</p>
    </div>
  );
}

export default BookingForm;
