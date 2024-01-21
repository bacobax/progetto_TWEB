const express = require('express');
const {getAllRoom, getOneRoom, deleteRoom, createRoom, getAllUserRoom, updateRoom , newMessage, joinRoom, search, leaveRoom} = require('../controllers/room');
const {protect} = require("../controllers/special/authController");
const router = express.Router();

router.route('/').post(protect, createRoom);
router.route('/user').get(protect, getAllUserRoom);
router.route('/newMessage/:roomID').post(protect, newMessage);
router.route('/join/:roomID').post(protect, joinRoom);
router.route('/leave/:roomID').post(protect, leaveRoom);
router.route("/search/:name").get(protect, search);
module.exports = router;