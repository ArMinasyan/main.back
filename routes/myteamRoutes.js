const express = require('express');
const router = express.Router();
const MyTeamController = require('../controllers/myteamController');

router.get('/myTeam', MyTeamController.getMyTeams);

module.exports = router;
