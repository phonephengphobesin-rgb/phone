const mysql = require("mysql");
require('dotenv').config(); // โหลดค่าจากไฟล์ .env
const dbConfig = require("../config/db.config.js");

// Create connection to database
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB
});

// Open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;