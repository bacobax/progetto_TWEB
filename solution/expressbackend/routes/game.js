const express = require('express');
const { getAllGame, createGame, deleteAllGame, deleteGame, getOneGame, updateGame} = require('../controllers/game');
const {verifyQueryFields, verifyModelSelectedFields} = require("../utils/verifyQueryFields");


const router = express.Router();


router.route('/').get(verifyQueryFields("competition_id") ,getAllGame).post(createGame);
router.route('/:id').get(getOneGame).patch(updateGame).delete(deleteAllGame);

module.exports = router;
