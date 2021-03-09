const express = require('express');
const app = express();
const socketio = require('socket.io'); // upercase Server.

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9000);
            // can use new or NO new. They auto add "new" in the socket.io library.
// io is our SOCKET SERVER.
// io = lowercase server.
const io = socketio(expressServer, { pingInterval : 2000}); // The SOCKET SERVER is LISTENING TO THE HTTP SERVER.

// connection based on the namespace they connected to. Namespace Examples: /admin, / (default), /chat.
// NOT FORGET THIS: SOCKET ALWAYS BELONGS TO A NAMESPACE.
io.on('connection',(socket) => {
    socket.emit('messageFromServer', "GATO");
    // Listen to THAT SOCKET, if this EVENT ever happens, it will run.
    socket.on('messageToServer', (dataFromClient) => {
        console.log(dataFromClient);
    });

    socket.on('newMessageToServer', (msg) => {
        console.log(msg);
        io.emit('messageToClients', {text:msg.text}); // send all clients.
    });


})

io.of('/admin').on('connection',(socket) => {
    socket.emit('admin', "GATO");
    // Listen to THAT SOCKET, if this EVENT ever happens, it will run.
})