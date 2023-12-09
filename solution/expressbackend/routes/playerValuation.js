const express = require('express');
const { getAllPlayerValuation, createPlayerValuation, deleteAllPlayerValuation, deletePlayerValuation, getOnePlayerValuation, updatePlayerValuation } = require('../controllers/playerValuation');


const router = express.Router();


router.route('/').get(getAllPlayerValuation).post(createPlayerValuation);
router.route('/:id').get(getOnePlayerValuation).patch(updatePlayerValuation).delete(deletePlayerValuation);

module.exports = router;
