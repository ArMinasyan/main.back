const Gallery = require('../models/Gallery');

const getGallery = async (req, res) => {
    try {
        const results = await Gallery.getGallery();
        return res.status(200).json({ results });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getGallery
};
