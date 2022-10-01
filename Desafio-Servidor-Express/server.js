const express = require("express");
const Contenedor = require("./container");

const contenedor = new Contenedor(`productos`)

const app = express();

app.get("/",(req,res) =>{
    res.send("Servidor funcionando")
})
app.get("/productos", async (req, res) =>{
    const productos = await contenedor.getAll();
    res.send(productos);
})

app.get("/productoRandom",async (req,res)=>{
    const productos = await contenedor.getAll();
    const productoRandom = productos[Math.floor(Math.random() * productos.length)];
    res.send(productoRandom);
})  


const PORT = 8080

app.listen(PORT,()=>{
    console.log(`Servidor http escuchando en el puerto ${PORT}`)
})

app.on("Error", error => console.log(`Error en el servidor ${error}`))
