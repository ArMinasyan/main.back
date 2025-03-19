const db = require('../config/db');

const Image = {
    getImageById: (id, callback) => {
        const sql = 'SELECT img FROM teachers WHERE id = ?';
        db.query(sql, [id], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            if (result.length > 0) {
                return callback(null, result[0].url);
            } else {
                return callback(new Error('Image not found'), null);
            }
        });
    }
};

module.exports = Image;
