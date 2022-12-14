
const express = require("express");
const Contenedor = require("../container");
const productsRouter = express.Router();

const contenedor = new Contenedor(`productos.txt`)

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
productsRouter.put(`/:id`, async(req,res)=>{
    try {
		const {id} = req.params;
        console.log(id)
		const updateProduct = req.body;
        console.log(updateProduct)
		const updatedProduct = await contenedor.updateById(parseInt(id),updateProduct);
		console.log(updatedProduct);
		if (updatedProduct) {
			res.status(200).json({
				message: "Producto actualizado",
				updatedProduct,
			});
		} else {
			res.status(404).json({
				error: "No se puede actualizar el producto porque no existe",
			});
		}
	} catch (err) {
		console.log(err);
	}
})

productsRouter.delete("/:id", async(req, res) => {
    try {
		const { id } = req.params;
		const deleteProduct = await contenedor.deleteById(parseInt(id));
		if (deleteProduct) {
			res.status(200).json({
				message: "Producto eliminado exitosamente",
				deletedProductId: deleteProduct.id,
			});
		} else {
			res.status(404).json({
				error: "No existe el producto que desea eliminar",
			});
		}
	} catch (err) {
		console.log(err);
	}
})

module.exports = productsRouter;