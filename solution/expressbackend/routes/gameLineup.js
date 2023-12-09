const express = require('express');
const { getAllGameLineup, createGameLineup, deleteGameLineup, getOneGameLineup, updateGameLineup} = require('../controllers/gameLineup');


const router = express.Router();


router.route('/').get(getAllGameLineup).post(createGameLineup);
router.route('/:id').get(getOneGameLineup).patch(updateGameLineup).delete(deleteGameLineup);

module.exports = router;
