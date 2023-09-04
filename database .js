const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/appointment-scheduler', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
-- SQL schema for consultant availability
CREATE TABLE consultants (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  -- Add other consultant details as needed
);

CREATE TABLE availability (
  id INT AUTO_INCREMENT PRIMARY KEY,
  consultant_id INT,
  working_hours_start TIME,
  working_hours_end TIME,
  -- Add fields for breaks and days off as needed
  FOREIGN KEY (consultant_id) REFERENCES consultants(id)
);
