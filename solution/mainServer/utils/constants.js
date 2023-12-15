const catchAsync = require("./catchAsync");
const axios = require("axios");
const JAVA_SERVER_URL = 'http://localhost:8081';
const NODE_SERVER_URL = 'http://localhost:8080';

const getJavaServerUrl = (path) => `${JAVA_SERVER_URL}${path}`;

exports.getJavaServerUrl = getJavaServerUrl;

const getNodeServerUrl = (path) => `${NODE_SERVER_URL}${path}`;

exports.getNodeServerUrl = getNodeServerUrl;

const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    containsValue: (value) => {
        return Object.values(this).includes(value);
    }
}

exports.SERVERS = {
    JAVA : getJavaServerUrl,
    NODE : getNodeServerUrl,
}

exports.METHODS = METHODS;

exports.getAxiosRedirect = (method=undefined, getRedirectServer)=>{
    if(method === METHODS.GET || method === undefined || !METHODS.containsValue(method)){
        return catchAsync(async (req, res) => {
            const path = req.originalUrl; // Get the full path of the request
            const targetUrl = getRedirectServer(path) // Replace with your target server URL

            try {
                const response = await axios.get(targetUrl);
                res.json(response.data); // Forward the response from the other server to the client
            } catch (error) {
                res.status(500).send("Error redirecting request");
            }
        })
    }
    if(method === METHODS.POST){
        return catchAsync(async (req, res) => {
            const path = req.originalUrl; // Get the full path of the request
            const body = req.body;
            const targetUrl = getRedirectServer(path) // Replace with your target server URL

            try {
                const response = await axios.post(targetUrl, body);
                res.json(response.data); // Forward the response from the other server to the client
            } catch (error) {
                res.status(500).send("Error redirecting request");
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
                res.status(500).send("Error redirecting request");
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
                res.status(500).send("Error redirecting request");
            }
        })
    }
}