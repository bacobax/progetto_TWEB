const express = require('express');
const {getAllRoom, getOneRoom, deleteRoom, createRoom, deleteAllRoom, updateRoom} = require('../controllers/room');
const router = express.Router();

router.route('/').get(getAllRoom).post(createRoom);
router.route('/:id').get(getOneRoom).patch(updateRoom).delete(deleteRoom);

module.exports = router;