const MyTeam = require('../models/MyTeam');

const getMyTeams = async (req, res) => {
    try {
        const results = await MyTeam.getAllMyTeams();
        return res.status(200).json(results);
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getMyTeams
};
