const Room = require('../models/room');
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');

const {createOne, getAll, deleteAll, deleteOne, getOne, updateOne} = require('./special/handlerFactory');
const AppError = require("../utils/appError");

exports.createRoom = createOne(Room);

exports.getAllRoom = getAll(Room);

exports.deleteAllRoom = deleteAll(Room);

exports.deleteRoom = deleteOne(Room);

exports.getOneRoom = getOne(Room);

exports.updateRoom = updateOne(Room);

exports.getAllUserRoom = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const doc = await Room.find({members: id});
    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: doc,
    });
});