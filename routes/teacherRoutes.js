const express = require('express');
const router = express.Router();
const TeacherController = require('../controllers/teacherController');

router.get('/teachers', TeacherController.getTeachers);

module.exports = router;
