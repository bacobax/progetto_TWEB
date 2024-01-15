const express = require('express');
const { getAllPlayer, createPlayer, getByName, deletePlayer, getOnePlayer, updatePlayer, clubsTotalMarketValue,getAllNationalities,getMinMaxMarketValue} = require('../controllers/player');


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
router.route("/clubsMarketValue").get(clubsTotalMarketValue);
router.route("/nationalities").get(getAllNationalities);

router.route('/:id').get(getOnePlayer).patch(updatePlayer).delete(deletePlayer);
router.route("/name/:name").get(getByName);
router.route("/market_value_in_eur/minmax").get(getMinMaxMarketValue);


module.exports = router;
