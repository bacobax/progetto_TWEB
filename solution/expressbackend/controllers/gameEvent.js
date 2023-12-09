const GameEvent = require('../models/gameEvent');

const catchAsync = require('../utils/catchAsync');

const {createOne, getAll, deleteAll, deleteOne, getOne, updateOne} = require('./special/handlerFactory');

exports.createGameEvent = createOne(GameEvent);

exports.getAllGameEvent = getAll(GameEvent);

exports.deleteAllGameEvent = deleteAll(GameEvent);

exports.deleteGameEvent = deleteOne(GameEvent);

exports.getOneGameEvent = getOne(GameEvent);

exports.updateGameEvent = updateOne(GameEvent);
