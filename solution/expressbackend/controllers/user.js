const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.createUser = factory.createOne(User);
exports.getAllUser = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: users,
  });
});
exports.getOneUser = factory.getOne(User);
