const express = require("express");
const productRouter = require("./routes/routes");

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/productos", productRouter);


const PORT = 8080

app.listen(PORT,()=>{
    console.log(`Servidor http escuchando en el puerto ${PORT}`)
})

app.on("Error", error => console.log(`Error en el servidor ${error}`))
