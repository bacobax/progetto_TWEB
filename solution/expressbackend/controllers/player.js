const Player = require('../models/player');

const catchAsync = require('../utils/catchAsync');

const {createOne, getAll, deleteAll, deleteOne, getOne, updateOne} = require('./special/handlerFactory');
const AppError = require("../utils/appError");

exports.createPlayer = createOne(Player);

exports.getAllPlayer = getAll(Player);

exports.deleteAllPlayer = deleteAll(Player);

exports.deletePlayer = deleteOne(Player);

exports.getOnePlayer = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const doc = await Player.findById(id)
        .populate('gameEvents')
        .populate('valuations')
        .populate('lineups')
        .populate('appearances');
    if (!doc) {
        return next(new AppError('No document found with that ID', 404));

    }

    res.status(200).json({
        status: 'success',
        data: doc,
    });
});

exports.updatePlayer = updateOne(Player);
