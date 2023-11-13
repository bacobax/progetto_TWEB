const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const AppError = require('./utils/appError');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(function (req, res, next) {
  const err = new AppError(
    `Could not find ${req.originalUrl} in the server`,
    404
  );
  next(err);
});

// error handler
app.use(globalErrorHandler);

module.exports = app;
