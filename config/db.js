const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Kjkszpj.98',
    database: 'polyglot',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection()
    .then(connection => {
        console.log('Database connection established');
        connection.release();
    })
    .catch(err => {
        console.error('Error establishing database connection:', err);
    });

module.exports = pool;
