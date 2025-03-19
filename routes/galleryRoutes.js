const express = require('express');
const router = express.Router();
const GalleryController = require('../controllers/galleryController');

router.get('/gallery', GalleryController.getGallery);

module.exports = router;
