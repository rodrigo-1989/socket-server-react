
const express   = require('express');
const http      = require('http');
const socketio  = require('socket.io');
const path      = require('path');
const cors      = require('cors');

const Sockets = require('./sockets');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        //Http:server 
        this.server = http.createServer( this.app );
        //Configuraciones de sockets
        this.io = socketio( this.server, {cors: {
            origin: "*",
            methods: ["GET", "POST"]
          }});
    }

    middlewares(){
        this.app.use( express.static ( path.resolve( __dirname , '../public' ) ) );

        //CORS
        this.app.use( cors() );
    }

    configurarSockets(){
        new Sockets( this.io );
    }

    execute(){
        this.middlewares();
        this.configurarSockets();
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto :', this.port);
        }   );
    }
}

module.exports = Server;