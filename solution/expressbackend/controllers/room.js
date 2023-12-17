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
    const doc = await Room.find({members: id}).populate({
        path: "messages.from",
        select: "name"
    }).populate({
        path: "members",
        select: "name"
    });
    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: doc,
    });
});

exports.newMessage = catchAsync(async (req, res, next) => {
    const user = req.user;
    const roomID = req.params.roomID;
    const room = await Room.findById(roomID);
    console.log("New message");

    if (!room) {
        return next(new AppError('No document found with that ID', 404));
    }

    if(!room.members.includes(user._id)){
        return next(new AppError('You are not a member of this room', 404));
    }

    room.messages.push({
        from: user._id,
        text: req.body.text
    });
    await room.save();
    res.status(200).json({
        status: 'success',
        data: room,
    });
});


exports.joinRoom = catchAsync(async (req, res, next) => {
    const user = req.user;
    const roomID = req.params.roomID;

    const room = await Room.findById(roomID);

    if (!room) {
        return next(new AppError('No document found with that ID', 404));
    }

    if(room.members.includes(user._id)){
        return next(new AppError('You are already a member of this room', 404));
    }

    room.members.push(user._id);

    await room.save();

    res.status(200).json({
        status: 'success',
        data: room,
    });


})