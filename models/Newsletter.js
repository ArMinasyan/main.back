const db = require('../config/db');

class Newsletter {
    constructor(email) {
        this.email = email;
    }

    save(callback) {
        const query = 'INSERT INTO newsletter (email) VALUES (?)';
        console.log('Executing query:', query, 'with email:', this.email);

        db.query(query, [this.email], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    }
}

module.exports = Newsletter;
