const db = require('../config/db');

const MyTeam = {
    getAllMyTeams: async () => {
        const query = "SELECT id, img, name, description FROM myteam";
        try {
            const [results] = await db.query(query);
            return results;
        } catch (err) {
            throw err;
        }
    }
};

module.exports = MyTeam;
