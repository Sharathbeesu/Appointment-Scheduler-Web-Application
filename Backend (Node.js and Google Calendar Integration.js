// In your server.js file
const { google } = require('googleapis');
const { OAuth2 } = google.auth;

// ... (previous code)

// Function to create an event on Google Calendar with the user as a guest
function createGoogleCalendarEvent(userEmail, consultantEmail, appointmentDetails) {
  // Set up the OAuth2 client with access token for the consultant
  const accessToken = 'consultant_access_token'; // Replace with the consultant's access token
  oauth2Client.setCredentials({ access_token: accessToken });

  // Create a Google Calendar API client
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  // Define event details
  const event = {
    summary: 'Appointment with Consultant',
    description: `Appointment details: ${JSON.stringify(appointmentDetails)}`,
    start: {
      dateTime: '2023-09-15T10:00:00',
      timeZone: 'UTC', // Set the appropriate time zone
    },
    end: {
      dateTime: '2023-09-15T11:00:00',
      timeZone: 'UTC',
    },
    attendees: [
      { email: userEmail }, // Add the user as a guest
      { email: consultantEmail }, // Add the consultant's email
    ],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 30 }, // Send an email reminder to the guest 30 minutes before the event
        // Add more reminders as needed
      ],
    },
  };

  // Insert the event into the consultant's Google Calendar
  calendar.events.insert(
    {
      calendarId: 'primary', // Use 'primary' for the consultant's primary calendar
      resource: event,
    },
    (err, res) => {
      if (err) {
        console.error('Error creating Google Calendar event:', err);
      } else {
        console.log('Google Calendar event created:', res.data);
      }
    }
  );
}

// Call this function after successfully booking an appointment
// Example usage: createGoogleCalendarEvent('user@example.com', 'consultant@example.com', { date: '2023-09-15', time: '10:00 AM' });
