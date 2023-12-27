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
 * @param {string[]} except - An array of paths that should not be redirected.
 * @returns {function} A function that takes a request and a response, and redirects the request.
 */
const getAxiosRedirect = (method=undefined, getRedirectServer, except)=>{
    if(method === METHODS.GET || method === undefined || !METHODS.containsValue(method)){

        return catchAsync(async (req, res,next) => {

            console.log("REDIRECTING GET")
            const path = req.originalUrl; // Get the full path of the request

            if(except && except.includes(path)){
                return next();
            }

            const targetUrl = getRedirectServer(path) // Replace with your target server URL
            const headers = req.headers;

            try {
                const response = await axios.get(targetUrl , {
                    headers : {
                        Authorization: `${req.headers.authorization}`
                    },
                });
                res.json(response.data); // Forward the response from the other server to the client
            } catch (error) {
                throw new AppError(error.response.data.message , error.response.status);
            }
        })
    }
    if(method === METHODS.POST){
        return catchAsync(async (req, res,next) => {
            const path = req.originalUrl; // Get the full path of the request
            if(except && except.includes(path)){
                return next();
            }
            const body = req.body;
            const headers = req.headers;
            const targetUrl = getRedirectServer(path) // Replace with your target server URL
            try {
                console.log({
                    targetUrl,
                    body,
                    headers
                })
                const response = await axios.post(targetUrl, body, {
                    headers : {
                        Authorization: `${req.headers.authorization}`
                    },
                    timeout: 3000
                });
                console.log({response})
                res.json(response.data); // Forward the response from the other server to the client
            } catch (error) {
                throw new AppError(error.response.data.message , error.response.status);
            }
        })
    }
    if(method === METHODS.PUT){
        return catchAsync(async (req, res,next) => {
            const path = req.originalUrl; // Get the full path of the request
            if(except && except.includes(path)){
                return next();
            }
            const body = req.body;
            const targetUrl = getRedirectServer(path) // Replace with your target server URL

            try {

                const response = await axios.put(targetUrl, body, {
                    headers : {
                        Authorization: `${req.headers.authorization}`
                    },
                });
                res.json(response.data); // Forward the response from the other server to the client
            } catch (error) {
                throw new AppError(error.response.data.message , error.response.status);
            }
        })
    }
    if(method === METHODS.DELETE){
        return catchAsync(async (req, res,next) => {
            const path = req.originalUrl; // Get the full path of the request
            if(except && except.includes(path)){
                return next();
            }
            const targetUrl = getRedirectServer(path) // Replace with your target server URL

            try {
                const response = await axios.delete(targetUrl, {
                    headers : {
                        Authorization: `${req.headers.authorization}`
                    },
                });
                res.json(response.data); // Forward the response from the other server to the client
            } catch (error) {
                throw new AppError(error.response.data.message , error.response.status);
            }
        })
    }
}

/**
 * Returns a router that redirects REST requests to another server.
 *
 * @param {function} gerRedirectServer - A function that returns the URL of the server to redirect to.
 * @param {string[]} except - An array of paths that should not be redirected.
 * @returns {Object} A router that redirects REST requests.
 */
const getRESTRedirectRouter = (gerRedirectServer, except)=>{
    const router = express.Router();
    router.get('/*', getAxiosRedirect(METHODS.GET, gerRedirectServer, except)).post('*', getAxiosRedirect(METHODS.POST, gerRedirectServer, except)).put('*', getAxiosRedirect(METHODS.PUT, gerRedirectServer,except)).delete('*', getAxiosRedirect(METHODS.DELETE, gerRedirectServer,except));
    return router;
}

exports.getAxiosRedirect = getAxiosRedirect;
exports.getJavaRESTRedirectRouter = (except)=>getRESTRedirectRouter(SERVERS.JAVA, except);
exports.getNodeRESTRedirectRouter = (except)=>getRESTRedirectRouter(SERVERS.NODE,except);
exports.SERVERS = SERVERS;
exports.getJavaServerUrl = getJavaServerUrl;
exports.METHODS = METHODS;
exports.getNodeServerUrl = getNodeServerUrl;