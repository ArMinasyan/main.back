const Comment = require('../models/Comment');
const Product = require("../models/Product");

const getComments = (req, res) => {
    Comment.getAllComments((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching comment' });
        }
        return res.status(200).json(results);
    });
};

module.exports = {
    getComments
};

