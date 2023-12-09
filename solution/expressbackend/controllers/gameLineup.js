const GameLineup = require('../models/gameLineup');

const catchAsync = require('../utils/catchAsync');

const {createOne, getAll, deleteAll, deleteOne, getOne, updateOne} = require('./special/handlerFactory');

exports.createGameLineup = createOne(GameLineup);

exports.getAllGameLineup = getAll(GameLineup);

exports.deleteAllGameLineup = deleteAll(GameLineup);

exports.deleteGameLineup = deleteOne(GameLineup);

exports.getOneGameLineup = getOne(GameLineup);

exports.updateGameLineup = updateOne(GameLineup);

