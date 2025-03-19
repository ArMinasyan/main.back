const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/imageController');

router.post('/picture', uploadController.uploadImage);

module.exports = router;
