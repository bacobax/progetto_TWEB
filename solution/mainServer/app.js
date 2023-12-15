const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const globalErrorMiddleware = require('./controllers/errorController');
const {getNodeRESTRedirectRouter, getJavaRESTRedirectRouter} = require("./utils/options");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/player", getNodeRESTRedirectRouter());
app.use("/api/clubs", getJavaRESTRedirectRouter());
app.use("/api/room" , getNodeRESTRedirectRouter());

app.use(globalErrorMiddleware);

module.exports = app;
