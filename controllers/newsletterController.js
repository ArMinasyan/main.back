const Newsletter = require('../models/Newsletter');

exports.createNewsletter = (req, res) => {
    const { email } = req.body;
    const newContact = new Newsletter(email);

    newContact.save((err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error saving contact' });
        }
        res.status(201).json({ message: 'Contact saved successfully', contactId: result.insertId });
    });
};
