const pool = require('../config/db');

exports.createOrder = async (req, res) => {
    const { customer_name, customer_surname, customer_phone, cart } = req.body;

    if (!customer_name || !customer_surname || !customer_phone || !Array.isArray(cart) || cart.length === 0) {
        return res.status(400).json({ error: 'All fields are required, and cart must be a non-empty array' });
    }

    try {
        const query = 'INSERT INTO orders (customer_name, customer_surname, customer_phone, cart) VALUES (?, ?, ?, ?)';
        const values = [customer_name, customer_surname, customer_phone, JSON.stringify(cart)];
        const [result] = await pool.query(query, values);
        const orderId = result.insertId;
        res.status(201).json({ message: 'Order created successfully', orderId });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
