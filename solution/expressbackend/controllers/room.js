const Room = require('../models/room');

const catchAsync = require('../utils/catchAsync');

const {createOne, getAll, deleteAll, deleteOne, getOne, updateOne} = require('./special/handlerFactory');
const AppError = require("../utils/appError");

exports.createRoom = createOne(Room);

exports.getAllRoom = getAll(Room);

exports.deleteAllRoom = deleteAll(Room);

exports.deleteRoom = deleteOne(Room);

exports.getOneRoom = getOne(Room);

exports.updateRoom = updateOne(Room);
