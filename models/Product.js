const db = require('../config/db');

class Product {
    static async getAllProducts(callback) {
        try {
            const [results] = await db.query('SELECT * FROM products');
            callback(null, results);
        } catch (err) {
            callback(err, null);
        }
    }

    static async getProductById(id, callback) {
        try {
            const [results] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
            callback(null, results);
        } catch (err) {
            callback(err, null);
        }
    }
}

module.exports = Product;
