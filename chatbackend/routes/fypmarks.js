const express = require('express');
const router = express.Router();

// Get all marks
router.post('/marks', async (req, res) => {
    const newStudent = new Student(req.body);
    await newStudent.save();
    io.emit('studentUpdated', newStudent);
    res.json(newStudent);
  });
  
  router.put('/marks/:id', async (req, res) => {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    io.emit('studentUpdated', updatedStudent);
    res.json(updatedStudent);
  });
  
 router.delete('/marks/:id', async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    io.emit('studentDeleted', req.params.id);
    res.json({ message: 'Student deleted' });
  });
  

  module.exports = router ;