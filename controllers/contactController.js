const Contact = require('../models/Contact');

exports.createContact = (req, res) => {
    const { name, phone, message } = req.body;
    const newContact = new Contact(name, phone, message);

    newContact.save((err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error saving contact' });
        }
        res.status(201).json({ message: 'Contact saved successfully', contactId: result.insertId });
    });
};
