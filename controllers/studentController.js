const studentModel = require("../models/studentModel");

const handleGreeting = (req, res) => {
  res.send("Hello, Lao-Top API");
};

const handleGetStudents = (req, res) => {
  const studentsData = studentModel.getAllStudents();
  res.json(studentsData);
};

const studentController = {
  handleGreeting,
  handleGetStudents,
};

module.exports = studentController;