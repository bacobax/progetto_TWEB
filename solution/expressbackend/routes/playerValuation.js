const express = require('express');
const { getAllPlayerValuation, createPlayerValuation, deleteAllPlayerValuation, deletePlayerValuation, getOnePlayerValuation, updatePlayerValuation } = require('../controllers/playerValuation');


const router = express.Router();


router.route('/').get(getAllPlayerValuation).post(createPlayerValuation);

module.exports = router;
