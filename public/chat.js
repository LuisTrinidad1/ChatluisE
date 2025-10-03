var socket = io.connect('http://localhost:4000');
console.log("Conectado al servidor...");

var sonidoRecibido = new Audio('sounds/mensaje-recibido.mp3');

// Referencias al DOM
var persona = document.getElementById('persona'),
    appChat = document.getElementById('app-chat'),
    panelBienvenida = document.getElementById('panel-bienvenida'),
    usuario = document.getElementById('usuario'),
    mensaje = document.getElementById('output'),
    botonEnviar = document.getElementById('enviar'),
    escribiendoMensaje = document.getElementById('escribiendo-mensaje'),
    output = document.getElementById('ventana-mensajes'),
    botonIngresar = document.getElementById('ingresar');

// Evento para ingresar al chat
botonIngresar.addEventListener('click', function() {
    if (persona.value) {
        panelBienvenida.style.display = "none";
        appChat.style.display = "block";
        usuario.value = persona.value;
    }
});

// Enviar mensaje
botonEnviar.addEventListener('click', function () {
    if (mensaje.value) {
        socket.emit('chat', {
            mensaje: mensaje.value,
            usuario: usuario.value
        });
        mensaje.value = '';
    }
});

// Evento escribiendo
mensaje.addEventListener('keyup', function () {
    socket.emit('typing', {
        nombre: usuario.value,
        texto: mensaje.value
    });
});

// Recibir mensaje
socket.on('chat', function (data) {
    escribiendoMensaje.innerHTML = '';
    sonidoRecibido.play();
    output.innerHTML += `<p><strong>${data.usuario}:</strong> ${data.mensaje}</p>`;
});

// Recibir "escribiendo"
socket.on('typing', function (data) {
    if (data.texto) {
        escribiendoMensaje.innerHTML = `<p><em>${data.nombre}</em> está escribiendo un mensaje...</p>`;
    } else {
        escribiendoMensaje.innerHTML = '';
    }
});
