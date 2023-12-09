const Appearence = require('../models/appearence');

const catchAsync = require('../utils/catchAsync');

const {createOne, getAll, deleteAll, deleteOne, getOne, updateOne} = require('./special/handlerFactory');

exports.createAppearence = createOne(Appearence);

exports.getAllAppearence = getAll(Appearence);

exports.deleteAllAppearence = deleteAll(Appearence);

exports.deleteAppearence = deleteOne(Appearence);

exports.getOneAppearence = getOne(Appearence);

exports.updateAppearence = updateOne(Appearence);