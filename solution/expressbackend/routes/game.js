const express = require('express');
const { getAllGame, createGame, deleteAllGame, deleteGame, getOneGame, updateGame} = require('../controllers/game');


const router = express.Router();


router.route('/').get(getAllGame).post(createGame);
router.route('/:id').get(getOneGame).patch(updateGame).delete(deleteAllGame);

module.exports = router;
