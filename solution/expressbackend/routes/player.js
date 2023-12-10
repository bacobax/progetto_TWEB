const express = require('express');
const { getAllPlayer, createPlayer, deleteAllPlayer, deletePlayer, getOnePlayer, updatePlayer} = require('../controllers/player');


const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Player:
 *       type: object
 *       required:
 *         - name
 *
 */

router.route('/').get(getAllPlayer).post(createPlayer);
router.route('/:id').get(getOnePlayer).patch(updatePlayer).delete(deletePlayer);

module.exports = router;
