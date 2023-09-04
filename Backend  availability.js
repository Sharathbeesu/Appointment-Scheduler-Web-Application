// Backend (Node.js)
// Add an index to the consultant's appointments field.
consultantSchema.index({ 'appointments.startTime': 1 });

// Rebuild the index when necessary (e.g., during application startup).
consultantSchema.on('index', (error) => {
  if (error) {
    console.error('Error creating index:', error);
  } else {
    console.log('Index created successfully.');
  }
});
