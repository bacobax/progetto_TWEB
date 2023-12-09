const express = require('express');
const {  getAllAppearence, createAppearence, deleteAllAppearence, deleteAppearence, getOneAppearence, updateAppearence} = require('../controllers/appearence');


const router = express.Router();


router.route('/').get(getAllAppearence).post(createAppearence);
router.route('/:id').get(getOneAppearence).patch(updateAppearence).delete(deleteAppearence);

module.exports = router;
