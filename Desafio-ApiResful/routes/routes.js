
const express = require("express");
const Contenedor = require("../container");
const productsRouter = express.Router();

const contenedor = new Contenedor(`productos`)

productsRouter.get("/", async(req,res) =>{
    try {
        const products = await contenedor.getAll();
        console.log(products)
        res.send(products)
    } catch (error) {
        res.status(500).send("hubo un error en el servidor")
    }
})
productsRouter.get("/:id", async(req,res)=>{
    const {id} = req.params;
    const product = await contenedor.getById(parseInt(id));
    if(product){
        res.json({
            mensaje:"producto encontrado",
            product: product
        })
    }else{
        res.json({
            mensaje:"producto no encontrado"
        })
    }
})
productsRouter.post("/",async(req,res)=>{
    const newProduct = req.body;
    const product = await contenedor.save(newProduct);
    res.json({
        mensaje:"producto creado",
        response: product
    })
})
productsRouter.put("/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        console.log(id)
        const newInfo = req.body;
        console.log(newInfo)
        const productosActualizados = await contenedorProductos.updateById(parseInt(id),newInfo);
        console.log(productosActualizados)
        res.json({
            message:`El producto con el id ${id} fue actualizado`,
            response: productosActualizados
        })
    } catch (error) {
        
    }
})

productsRouter.delete("/:id", (req, res) => {
    const { id } = req.params;
    const respuesta = contenedor.deleteById(Number(id));
    res.render("borrarProducto",{respuesta})
})

module.exports = productsRouter;