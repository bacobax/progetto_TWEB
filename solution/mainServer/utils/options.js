const catchAsync = require("./catchAsync");
const axios = require("axios");
const dotenv = require('dotenv');

const express = require("express");
const AppError = require("./appError");

dotenv.config({ path: './config.env' });

const JAVA_SERVER_URL = 'http://localhost:8081';
const NODE_SERVER_URL = 'http://localhost:8000';

const getJavaServerUrl = (path) => `${JAVA_SERVER_URL}${path}`;



const getNodeServerUrl = (path) => `${NODE_SERVER_URL}${path}`;


const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    containsValue: function(value) {
        return Object.values(this).includes(value);
    }
}

const SERVERS = {
    JAVA : getJavaServerUrl,
    NODE : getNodeServerUrl,
}



const getAxiosRedirect = (method=undefined, getRedirectServer)=>{
    if(method === METHODS.GET || method === undefined || !METHODS.containsValue(method)){

        return catchAsync(async (req, res) => {
            console.log("REDIRECTING GET")
            const path = req.originalUrl; // Get the full path of the request
            const targetUrl = getRedirectServer(path) // Replace with your target server URL

            try {
                const response = await axios.get(targetUrl);
                res.json(response.data); // Forward the response from the other server to the client
            } catch (error) {
                throw new AppError("Error redirecting request: " + error.message , error.response.status);
            }
        })
    }
    if(method === METHODS.POST){
        return catchAsync(async (req, res,next) => {
            const path = req.originalUrl; // Get the full path of the request
            const body = req.body;
            const targetUrl = getRedirectServer(path) // Replace with your target server URL

            try {
                const response = await axios.post(targetUrl, body);
                res.json(response.data); // Forward the response from the other server to the client
            } catch (error) {
                throw new AppError("Error redirecting request: " + error.message , error.response.status);
            }
        })
    }
    if(method === METHODS.PUT){
        return catchAsync(async (req, res) => {
            const path = req.originalUrl; // Get the full path of the request
            const body = req.body;
            const targetUrl = getRedirectServer(path) // Replace with your target server URL

            try {
                const response = await axios.put(targetUrl, body);
                res.json(response.data); // Forward the response from the other server to the client
            } catch (error) {
                throw new AppError("Error redirecting request: " + error.message , error.response.status);
            }
        })
    }
    if(method === METHODS.DELETE){
        return catchAsync(async (req, res) => {
            const path = req.originalUrl; // Get the full path of the request
            const targetUrl = getRedirectServer(path) // Replace with your target server URL

            try {
                const response = await axios.delete(targetUrl);
                res.json(response.data); // Forward the response from the other server to the client
            } catch (error) {
                throw new AppError("Error redirecting request: " + error.message , error.response.status);
            }
        })
    }
}


const getRESTRedirectRouter = (gerRedirectServer)=>{
    const router = express.Router();
    router.get('/*', getAxiosRedirect(METHODS.GET, gerRedirectServer)).post('*', getAxiosRedirect(METHODS.POST, gerRedirectServer)).put('*', getAxiosRedirect(METHODS.PUT, gerRedirectServer)).delete('*', getAxiosRedirect(METHODS.DELETE, gerRedirectServer));
    return router;
}


exports.getAxiosRedirect = getAxiosRedirect;
exports.getJavaRESTRedirectRouter = ()=>getRESTRedirectRouter(SERVERS.JAVA);
exports.getNodeRESTRedirectRouter = ()=>getRESTRedirectRouter(SERVERS.NODE);
exports.SERVERS = SERVERS;
exports.getJavaServerUrl = getJavaServerUrl;
exports.METHODS = METHODS;
exports.getNodeServerUrl = getNodeServerUrl;