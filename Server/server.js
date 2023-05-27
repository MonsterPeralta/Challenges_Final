const express = require('express')
require('dotenv').config()
const{dbConnection}= require('../database/config')
const cors = require ('cors')
const {socketController}= require('../sockets/controller');

class Server{
    constructor(){

        this.headers = {
            cors:{
                origin: 'http://127.0.0.1:5173',
                methods: ["GET", "POST"]
            }
        }

        //CREAR EXPRESS APP
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server, this.headers)

        this.paths = {
            auth: '/api/auth',
            task: '/api/task'
        }

        this.connectToDB();
        this.addMiddlewares();
        this.setRoutes();

        //SOCKETS
        this.sockets()
    }

    //BASE DE DATPS 
    async connectToDB(){
        await dbConnection();
    }

    addMiddlewares(){
        //CORS
        this.app.use(cors())

        //LECTURA Y PARSEO DEL BODY
        this.app.use(express.json());

        //PUBLIC FOLDER
        this.app.use(express.static('public'))

    }

    setRoutes(){
        //RUTAS
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.task, require('../routes/task'))
    }

    sockets(){
        this.io.on(
            'connection',
            socket => socketController(socket, this.io)
        )
    }

    listen(){
        //ESCUCHAR EN PUERTO 4000
        this.server.listen(this.port, () =>{
            console.log('Servidor corriendo en puerto', process.env.PORT)
        })
    }
}

module.exports = Server;