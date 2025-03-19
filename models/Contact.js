const db = require('../config/db');

class Contact {
    constructor(name, phone, message) {
        this.name = name;
        this.phone = phone;
        this.message = message;
    }

    save(callback) {
        const query = 'INSERT INTO contact (name, phone, message) VALUES (?, ?, ?)';
        db.query(query, [this.name, this.phone, this.message], callback);
    }
}

module.exports = Contact;
