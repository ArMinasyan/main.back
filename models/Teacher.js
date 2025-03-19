const db = require('../config/db');

const Teacher = {
    getAllTeachers: async () => {
        try {
            const [results, fields] = await db.query("SELECT id, img, name, description FROM teachers");
            return results;
        } catch (err) {
            throw err;
        }
    }
};

module.exports = Teacher;
