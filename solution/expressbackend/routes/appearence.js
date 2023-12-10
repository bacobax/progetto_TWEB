const express = require('express');
const {  getAllAppearence, createAppearence, deleteAllAppearence, deleteAppearence, getOneAppearence, updateAppearence} = require('../controllers/appearence');
const {params} = require("../models/swaggerSchemas/appearence");


const router = express.Router();



const swaggerAppearenceRoute = {
    '/appearence' : {
        get: {
            summary: 'Get all appearence based on url query',
            parameters: params,
            responses: {
                200: {
                    description: 'Success',
                }
            }
        },
    },
}

router.route('/').get(getAllAppearence).post(createAppearence);
router.route('/:id').get(getOneAppearence).patch(updateAppearence).delete(deleteAppearence);

module.exports = router;
exports.swaggerAppearenceRoute = swaggerAppearenceRoute;