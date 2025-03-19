const db = require('../config/db');
    class Comment{
    static async getAllComments(callback) {
        try {
            const [results] = await db.query('SELECT * FROM comment');
            callback(null, results);
        } catch (err) {
            callback(err, null);
        }
    }
}
module.exports = Comment
