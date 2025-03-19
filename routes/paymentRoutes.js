const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/success', paymentController.handleSuccess);
router.post('/fail', paymentController.handleFail);
router.post('/result', paymentController.handleResult);

module.exports = router;
