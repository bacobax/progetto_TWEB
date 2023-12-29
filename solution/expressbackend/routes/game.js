const express = require('express');
const { getAllGame, createGame, deleteAllGame, deleteGame, getOneGame, updateGame, getEvents} = require('../controllers/game');
const {verifyQueryFields, verifyModelSelectedFields} = require("../utils/verifyQueryFields");


const router = express.Router();


router.route('/').get(getAllGame).post(createGame);
router.route('/:id').get(getOneGame).patch(updateGame).delete(deleteAllGame);
router.route("/:id/events").get(getEvents)

module.exports = router;
