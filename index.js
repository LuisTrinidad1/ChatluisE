const express = require('express');
const socketIO = require('socket.io');
const app = express();

app.use(express.static('public'));

const server = app.listen(4000, '0.0.0.0', () => {
    console.log('Server running on http://3.22.186.213:4000');
});

const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('Nueva conexión:', socket.id);

    // Escuchar mensajes del cliente
    socket.on('chat message', (data) => {
        console.log('Mensaje recibido:', data);
        // Emitir a todos los clientes
        io.sockets.emit('chat message', {
            user: socket.id,
            text: data,
            time: new Date().toLocaleTimeString()
        });
    });

    // Escuchar cuando el usuario escribe
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });
});
