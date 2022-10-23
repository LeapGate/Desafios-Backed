const express = require("express");
const {Server} = require("socket.io");
const app = express();




app.use(express.static(__dirname+"/public"));

const PORT = 8080
const server = app.listen(PORT,()=> console.log(`Servidor http escuchando en el puerto ${PORT}`));  

const io = new Server(server)