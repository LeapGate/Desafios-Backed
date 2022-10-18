const express = require("express");
const productRouter = require("./routes/routes");
const { engine } = require("express-handlebars");

const app = express();
const PORT = 8080


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/", productRouter);


app.use(express.static("public"));


//Views 

app.engine(`hbs`,engine({extname: `.hbs`})); 
app.set(`view engine`, `hbs`)  
app.set(`views`, `./handlebars/views`); 

/* app.set(`views`, `./pug/views`);
app.set(`view engine`, `pug`); */


app.listen(PORT,()=>{
    console.log(`Servidor http escuchando en el puerto ${PORT}`)
});

app.on("Error", error => console.log(`Error en el servidor ${error}`))
