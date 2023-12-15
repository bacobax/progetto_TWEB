const express = require('express');
const router = express.Router();


const {METHODS, object, SERVERS, getAxiosRedirect} = require("../utils/constants");

// catch all the routes starting with /players/<others variations> and redirect the request on another server with axios



router.get('*', getAxiosRedirect(METHODS.GET, SERVERS.NODE)).post('*', getAxiosRedirect(METHODS.POST, SERVERS.NODE)).put('*', getAxiosRedirect(METHODS.PUT, SERVERS.NODE)).delete('*', getAxiosRedirect(METHODS.DELETE, SERVERS.NODE));



module.exports = router;