const express = require('express');
const pool = require('../config/db');
const router = express.Router();

router.post('/orders', async (req, res) => {
    const { customer_name, customer_surname, customer_phone, cart } = req.body;


    if (!customer_name || !customer_surname || !customer_phone || !Array.isArray(cart) || cart.length === 0) {
        return res.status(400).json({ error: 'All fields are required and cart must be a non-empty array' });
    }

    try {
        const query = 'INSERT INTO orders (customer_name, customer_surname, customer_phone, cart) VALUES (?, ?, ?, ?)';
        const values = [customer_name, customer_surname, customer_phone, JSON.stringify(cart)];
        const [result] = await pool.query(query, values);

        const orderId = result.insertId;

        const isProduction = process.env.NODE_ENV === 'production';
        const BASE_URL = isProduction ? 'https://academy-polyglot.site' : 'http://localhost:5001';
        const SUCCESS_URL = `${BASE_URL}/api/payment/success/${orderId}`;
        const RESULT_URL = `${BASE_URL}/api/payment/result/${orderId}`;
        const FAIL_URL = `${BASE_URL}/api/payment/fail/${orderId}`;

        console.log(BASE_URL);
        console.log(`SUCCESS_URL: ${SUCCESS_URL}`);
        console.log(`RESULT_URL: ${RESULT_URL}`);
        console.log(`FAIL_URL: ${FAIL_URL}`);

        res.status(201).json({
            message: 'Order created successfully',
            orderId,
            SUCCESS_URL,
            RESULT_URL,
            FAIL_URL
        });
    } catch (error) {
        console.error('Error creating order:', error.message);
        console.error('Stack trace:', error.stack); // Log the stack trace

        res.status(500).json({ error: 'Internal Server Error. Please check the server logs for more details.' });
    }
});

module.exports = router;
