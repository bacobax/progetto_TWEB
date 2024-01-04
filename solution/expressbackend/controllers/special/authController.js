const User = require('../../models/user');
const crypto = require('crypto');
const catchAsync = require('../../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('../../utils/appError');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');
const sendEmail = require('../../utils/email');

/**
 * This function generates a JSON Web Token (JWT) for a user.
 * It uses the user's ID and a secret key from the environment variables to generate the token.
 * The token expires after a duration specified in the environment variables.
 *
 * @param {string} id - The ID of the user.
 * @returns {string} The generated JWT.
 */
const signToken = (id) =>
  jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

/**
 * This is an asynchronous function that handles user signup.
 * It creates a new user in the database with the data in the request body.
 * It then generates a JWT for the new user using the signToken function.
 * The function sends a response with a status code of 201, the generated token, and the new user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 */
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    user: newUser,
  });
});
/**
 * This is an asynchronous function that handles user login.
 * It retrieves the email and password from the request body.
 * If the email or password is not provided, it throws an error with a status code of 400.
 * The function then finds the user in the database by their email and selects the password field (which is not selected by default).
 * If the user is not found or the provided password does not match the user's password, it throws an error with a status code of 401.
 * The function then generates a JWT for the user using the signToken function.
 * The password field is removed from the user object before sending the response.
 * The function sends a response with a status code of 200, the generated token, and the user (without the password field).
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 */
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
/**
 * This is an asynchronous middleware function that protects routes by checking if the user is authenticated.
 * It first checks if there is a token in the 'Authorization' header of the request.
 * If there is no token, it throws an error with a status code of 401.
 * The function then verifies the token using the secret key from the environment variables.
 * It then checks if the user associated with the token still exists in the database.
 * If the user does not exist, it throws an error with a status code of 401.
 * The function also checks if the user has changed their password after the token was issued.
 * If the password was changed, it throws an error with a status code of 401.
 * If all checks pass, it attaches the user to the request object and calls the next middleware function in the stack.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 */
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

/**
 * This is a middleware function that restricts access to certain roles.
 * It takes an arbitrary number of roles as arguments.
 * The function checks if the role of the user attached to the request object is included in the provided roles.
 * If the user's role is not included, it throws an error with a status code of 403.
 * If the user's role is included, it calls the next middleware function in the stack.
 *
 * @param {...string} roles - The roles that have access.
 * @returns {Function} A middleware function that restricts access to certain roles.
 */
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
/**
 * This is an asynchronous function that handles the password reset request.
 * It first finds the user in the database based on the email provided in the request body.
 * If the user is not found, it throws an error with a status code of 404.
 * The function then generates a password reset token for the user and saves the user.
 * It then constructs a password reset URL and a message to be sent to the user's email.
 * The function attempts to send an email to the user with the password reset token.
 * If the email fails to send, it resets the password reset token and expiry time on the user and saves the user.
 * It then throws an error with a status code of 500.
 * If the email is sent successfully, it sends a response with a status code of 200 and a success message.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 */
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
/**
 * This is an asynchronous function that handles the password reset process.
 * It first hashes the token provided in the request parameters.
 * The function then finds the user in the database based on the hashed token and checks if the token has not expired.
 * If the user is not found or the token has expired, it throws an error with a status code of 400.
 * The function then updates the user's password and confirmPassword with the data provided in the request body.
 * It also resets the passwordResetToken and passwordResetExpires fields on the user and saves the user.
 * The function then generates a JWT for the user using the signToken function.
 * The function sends a response with a status code of 200, the generated token, and a success status.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 */
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
