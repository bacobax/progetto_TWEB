import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = "http://localhost:8080/chat";

export const socket = io(URL);