
const express = require("express");
const Contenedor = require("../container");
const productsRouter = express.Router();

const contenedor = new Contenedor(`productos.txt`)

productsRouter.get("/", async(req,res)=>{
	try {
		res.render("home");	
	} catch (error) {
		res.send(error);
	}
});

productsRouter.get("/productos", async(req,res) =>{
    try {
        const products = await contenedor.getAll();
        res.render("products", {products})
    } catch (error) {
        res.status(500).send("hubo un error en el servidor")
    }
});

productsRouter.post("/productos",async(req,res)=>{
	try {
		const newProduct = req.body;
		contenedor.save(newProduct);
		res.status(201).redirect('/');	
	} catch (error) {
		console.log(error)
	}
});


module.exports = productsRouter;