const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost', // Your MySQL database host
  user: 'root', // Your MySQL database user
  password: 'your_password', // Your MySQL database password
  database: 'appointment_scheduler', // Your MySQL database name
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = db;


CREATE DATABASE IF NOT EXISTS appointment_scheduler;

USE appointment_scheduler;

CREATE TABLE IF NOT EXISTS consultants (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  // Add other consultant fields as needed
);

CREATE TABLE IF NOT EXISTS appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  consultant_id INT NOT NULL,
  user_id INT NOT NULL,
  time_slot DATETIME NOT NULL,
  status ENUM('booked', 'canceled') DEFAULT 'booked',
  // Add other appointment fields as needed
);

// Add more tables and columns as needed for your project





const db = require('../config/db');

// Get all consultants
function getAllConsultants() {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM consultants', (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

// Create a new consultant
function createConsultant(consultantData) {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO consultants SET ?', consultantData, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.insertId);
      }
    });
  });
}

// Add more database queries as needed

