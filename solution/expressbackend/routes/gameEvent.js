const express = require('express');
const {getAllGameEvent, createGameEvent, updateGameEvent, getOneGameEvent,deleteGameEvent } = require('../controllers/gameEvent');


const router = express.Router();


router.route('/').get(getAllGameEvent).post(createGameEvent);
router.route('/:id').get(getOneGameEvent).patch(updateGameEvent).delete(deleteGameEvent);

module.exports = router;
