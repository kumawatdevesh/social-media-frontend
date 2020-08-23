import openSocket from 'socket.io-client';
let socket = openSocket('http://localhost:5000');
export default socket;