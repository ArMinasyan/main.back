const path = require('path');
const multer = require('multer');
const fs = require('fs');
const db = require('../config/db');

const UPLOADS_DIR = path.join(__dirname, '..', 'picture');
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_DIR);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).single('image');

const uploadImage = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error uploading file', error: err.message });
        }

        const imageUrl = `http://localhost:5001/picture/${req.file.filename}`;
        const sql = 'INSERT INTO teachers (img) VALUES (?)';

        db.query(sql, [imageUrl], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error saving to database', error: err.message });
            }

            return res.status(201).json({ imageUrl });
        });
    });
};

module.exports = {
    uploadImage
};
