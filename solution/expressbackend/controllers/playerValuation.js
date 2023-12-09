const PlayerValuation = require('../models/playerValuation');

const catchAsync = require('../utils/catchAsync');

const {createOne, getAll, deleteAll, deleteOne, getOne, updateOne} = require('./special/handlerFactory');

exports.createPlayerValuation = createOne(PlayerValuation);

exports.getAllPlayerValuation = getAll(PlayerValuation);

exports.deleteAllPlayerValuation = deleteAll(PlayerValuation);

exports.deletePlayerValuation = deleteOne(PlayerValuation);

exports.getOnePlayerValuation = getOne(PlayerValuation);

exports.updatePlayerValuation = updateOne(PlayerValuation);
