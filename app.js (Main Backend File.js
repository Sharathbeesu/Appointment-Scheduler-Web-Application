const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const availabilityRoutes = require('./routes/availabilityRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/appointment-scheduler', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/availability', availabilityRoutes);
app.use('/api/booking', bookingRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
