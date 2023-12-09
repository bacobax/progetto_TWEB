const User = require('../../models/user');
const crypto = require('crypto');
const catchAsync = require('../../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('../../utils/appError');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');
const sendEmail = require('../../utils/email');

const signToken = (id) =>
  jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    user: newUser,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  console.log({body: req.body});
  const { email, password } = req.body;
  console.log({ email, password });
  if (!email || !password) {
    throw new AppError('please insert the password and the email', 400);
  }
  //il + perchè password è settato a not selected nel model
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError('Incorrect email or password', 401);
  }
  const { ['password']: psw, ...other } = user;
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
    user: other._doc,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  //1) vedere se c'è il token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  console.log({ token });

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access', 401)
    );
  }

  //2) Verification token

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);
  //3) Controllare se l'utente c'è ancora

  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError('The user belonging to this token does no longer exist', 401)
    );
  }

  //4) Controllare se l'utente ha cambiato psw dopo che il token è stato rilasciato

  if (freshUser.changePasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in Again. ', 401)
    );
  }
  req.user = freshUser;
  next();
});

exports.restrictTo = (...roles) => {
  return catchAsync(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          "You don't have the permission to perform this action",
          403
        )
      );
    }
    next();
  });
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  //1) Get user based on POSTed email

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with email address', 404));
  }

  //2) Generate the random reset token

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  //3) Send it to yser's email

  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/user/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget you password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your psw reset token',
      message,
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new AppError("We couldn't send the email", 500));
  }

  res.status(200).json({
    status: 'success',
    message: 'Token sent to email',
  });
});
exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password

  if (!user) {
    return next(new AppError('The token has expired or is invalid'));
  }

  // 3) Update changedPasswordAt property for the user

  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  // 4) Log the user in, send JWT

  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});
