const Product = require('../models/Product');

const getProducts = (req, res) => {
    Product.getAllProducts((err, results) => {
        if (err) {

            return res.status(500).json({ error: 'Error fetching products' });
        }
        return res.status(200).json(results);
    });
};

const getProductById = (req, res) => {
    const { id } = req.params;
    Product.getProductById(id, (err, results) => {
        if (err) {

            return res.status(500).json({ error: 'Error fetching product' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        return res.status(200).json(results[0]);
    });
};

module.exports = {
    getProducts,
    getProductById
};
