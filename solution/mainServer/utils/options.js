const catchAsync = require("./catchAsync");
const axios = require("axios");
const dotenv = require('dotenv');

const express = require("express");
const AppError = require("./appError");

dotenv.config({ path: './config.env' });

/**
 * The URL of the Java server.
 * @type {string}
 */
const JAVA_SERVER_URL = 'http://localhost:8081';

/**
 * The URL of the Node server.
 * @type {string}
 */
const NODE_SERVER_URL = 'http://localhost:8000';

/**
 * Returns the URL of the Java server with the given path appended.
 *
 * @param {string} path - The path to append to the server URL.
 * @returns {string} The full URL.
 */
const getJavaServerUrl = (path) => `${JAVA_SERVER_URL}${path}`;

/**
 * Returns the URL of the Node server with the given path appended.
 *
 * @param {string} path - The path to append to the server URL.
 * @returns {string} The full URL.
 */
const getNodeServerUrl = (path) => `${NODE_SERVER_URL}${path}`;

/**
 * An object representing HTTP methods.
 * @type {Object}
 */
const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    /**
     * Checks if the given value is a valid HTTP method.
     *
     * @param {string} value - The value to check.
     * @returns {boolean} True if the value is a valid HTTP method, false otherwise.
     */
    containsValue: function(value) {
        return Object.values(this).includes(value);
    }
}

/**
 * An object representing the servers.
 * @type {Object}
 */
const SERVERS = {
    JAVA : getJavaServerUrl,
    NODE : getNodeServerUrl,
}

/**
 * Returns a function that redirects a request to another server.
 *
 * @param {string} method - The HTTP method of the request.
 * @param {function} getRedirectServer - A function that returns the URL of the server to redirect to.
 * @returns {function} A function that takes a request and a response, and redirects the request.
 */
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

/**
 * Returns a router that redirects REST requests to another server.
 *
 * @param {function} gerRedirectServer - A function that returns the URL of the server to redirect to.
 * @returns {Object} A router that redirects REST requests.
 */
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