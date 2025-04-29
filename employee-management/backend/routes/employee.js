const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const auth = require('../middleware/auth');

// CREATE
router.post('/', auth, async (req, res) => {
  try {
    const newEmp = new Employee(req.body);
    await newEmp.save();
    res.status(201).json(newEmp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ
router.get('/', auth, async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE
router.put('/:id', auth, async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Employee not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Employee.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Employee not found" });
    res.json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
