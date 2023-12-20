const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const globalErrorMiddleware = require('./controllers/errorController');
const {getNodeRESTRedirectRouter, getJavaRESTRedirectRouter, getNodeServerUrl, getJavaServerUrl} = require("./utils/options");
const catchAsync = require("./utils/catchAsync");
const {search} = require("./controllers/search");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.route("/api/playerStat/:id").get(catchAsync(async (req,res,next)=>{
    const expressResponsePromise = await axios.get(getNodeServerUrl(`/api/player/${req.params.id}`));

    const {current_club_id, ...otherPlayerData} = expressResponsePromise.data.data;


    const javaResponsePromise = await axios.get(getJavaServerUrl(`/api/clubs/${current_club_id}`));
    const clubName = javaResponsePromise.data.name;

    res.status(200).json({
        status: "success",
        data: {
            ...otherPlayerData,
            clubName
        }
    })
}));
app.use("/api/player", getNodeRESTRedirectRouter());
app.use("/api/clubs", getJavaRESTRedirectRouter());
app.use("/api/room" , getNodeRESTRedirectRouter());

app.get("/api/search/:text",search);

app.use(globalErrorMiddleware);

module.exports = app;
