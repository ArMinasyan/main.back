const db = require('../config/db');

const Gallery = {
    getGallery: async () => {
        try {
            const [results] = await db.query("SELECT id, img FROM gallery");
            return results;
        } catch (err) {
            console.error('Error executing query:', err);
            throw err;
        }
    }
};

module.exports = Gallery;
