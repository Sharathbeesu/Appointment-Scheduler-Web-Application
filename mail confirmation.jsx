// src/components/Booking.js
import React, { useState } from 'react';
import axios from 'axios'; // Assuming you're using axios for API requests
import nodemailer from 'nodemailer'; // Import nodemailer

function Booking() {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [appointmentTitle, setAppointmentTitle] = useState('');

  // Function to send a confirmation email
  const sendConfirmationEmail = (userEmail, appointmentDetails) => {
    const transporter = nodemailer.createTransport({
      service: 'your_email_service_provider', // e.g., 'Gmail'
      auth: {
        user: 'your_email@example.com',
        pass: 'your_email_password',
      },
    });

    const mailOptions = {
      from: 'your_email@example.com',
      to: userEmail,
      subject: 'Appointment Confirmation',
      text: `Your appointment has been booked successfully. Details: ${JSON.stringify(appointmentDetails)}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  };

  const handleBooking = () => {
    // Implement the logic for booking a slot
    if (selectedSlot && appointmentTitle) {
      // Send a POST request to your API to book the slot
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startTime: selectedSlot.start,
          endTime: selectedSlot.end,
          title: appointmentTitle,
        }),
      };

      axios
        .post('/api/book-slot', requestOptions)
        .then((response) => {
          if (response.status === 200) {
            // Send a confirmation email to the user
            sendConfirmationEmail('user@example.com', {
              date: selectedSlot.start.toLocaleDateString(),
              time: selectedSlot.start.toLocaleTimeString(),
              title: appointmentTitle,
            });

            // Handle successful booking, e.g., show a confirmation message
            console.log('Booking successful');
          } else {
            console.error('Error booking slot:', response.statusText);
          }
        })
        .catch((error) => {
          console.error('Error booking slot:', error);
        });
    }
  };

  return (
    <div>
      <h1>Book an Appointment</h1>
      {/* Implement UI elements for selecting time slots and entering appointment details */}
      <input
        type="text"
        placeholder="Appointment Title"
        value={appointmentTitle}
        onChange={(e) => setAppointmentTitle(e.target.value)}
      />
      <button onClick={handleBooking}>Book</button>
    </div>
  );
}

export default Booking;
