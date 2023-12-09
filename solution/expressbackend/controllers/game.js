const Game = require('../models/game');

const catchAsync = require('../utils/catchAsync');

const {createOne, getAll, deleteAll, deleteOne, getOne, updateOne} = require('./special/handlerFactory');

exports.createGame = createOne(Game);

exports.getAllGame = getAll(Game);

exports.deleteAllGame = deleteAll(Game);

exports.deleteGame = deleteOne(Game);

exports.getOneGame = getOne(Game);

exports.updateGame = updateOne(Game);

