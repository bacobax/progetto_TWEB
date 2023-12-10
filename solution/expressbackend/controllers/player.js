const Player = require('../models/player');

const catchAsync = require('../utils/catchAsync');

const {createOne, getAll, deleteAll, deleteOne, getOne, updateOne} = require('./special/handlerFactory');

exports.createPlayer = createOne(Player);

exports.getAllPlayer = getAll(Player);

exports.deleteAllPlayer = deleteAll(Player);

exports.deletePlayer = deleteOne(Player);

exports.getOnePlayer = getOne(Player);

exports.updatePlayer = updateOne(Player);
