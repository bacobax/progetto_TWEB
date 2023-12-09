const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const {createOne,  getOne} = require('./special/handlerFactory');

exports.createUser = createOne(User);
exports.getAllUser = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: users,
  });
});
exports.getOneUser = getOne(User);
