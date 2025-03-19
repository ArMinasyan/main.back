module.exports = {
    db: {
        host: 'localhost',
        user: 'polyglot',
        password: '9NFU8zW2azzRg78HU29e5WJPJ',
        database: 'polyglot',
    },
    corsOptions: {
        origin: 'https://academy-polyglot.site',
        optionsSuccessStatus: 200,
        credentials: true
    },
    server: {
        port: process.env.PORT || 5001
    },
    queries: {
        comment: {
            getAll: 'SELECT * FROM comment'
        },
        contact: {
            insert: 'INSERT INTO contact (name, phone, message) VALUES (?, ?, ?)'
        },
        gallery: {
            getAll: 'SELECT id, img FROM gallery'
        },
        image: {
            getById: 'SELECT img FROM teachers WHERE id = ?'
        },
        myTeam: {
            getAll: 'SELECT id, img, name, description FROM myteam'
        },
        newsletter: {
            insert: 'INSERT INTO newsletter (email) VALUES (?)'
        },
        order: {
            insert: 'INSERT INTO orders (customer_name, customer_surname, customer_phone, cart) VALUES (?, ?, ?, ?)'
        },
        product: {
            getAll: 'SELECT * FROM products',
            getById: 'SELECT * FROM products WHERE id = ?'
        },
        teacher: {
            getAll: 'SELECT id, img, name, description FROM teachers'
        }
    }
};
