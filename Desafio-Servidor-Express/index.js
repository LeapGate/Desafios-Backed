/* const fs = require("fs");
const express = require("express");

const app = express();



class Contenedor{
    constructor(fileName){
        this.fileName = fileName;
    }

    save = async(product) =>{
       try {
            if(fs.existsSync(this.fileName)){

                const data = await fs.promises.readFile(this.fileName, "utf8"); 

                if(data){
                    const products = JSON.parse(data);
                    
                    const productExists = products.some(item => item.title === product.title);

                    if(productExists){
                        console.log(`El producto ${product.title} ya existe`)
                    }else{
                        const newProduct = {
                            id: products.length + 1,  
                            ...product
                        }
                        products.push(newProduct);
                        await fs.promises.writeFile(this.fileName, JSON.stringify(products, null, 2));
                        
                    }   
                }else{
                    const newProduct = {
                        id:1,  
                        ...product
                    }
                    await fs.promises.writeFile(this.fileName, JSON.stringify([newProduct], null, 2));
                }
            } else{
                const newProduct = {
                    id:1,  
                    ...product
                }
                await fs.promises.writeFile(this.fileName, JSON.stringify([newProduct], null, 2));
                
            }
       } catch (error) {
            console.log(error)
       }
    }
    getById = async(id) =>{
        try {

            const data = await this.getAll();
            const productExist = data.find(item => item.id === id)

            return productExist;
                           
                    
        } catch (error) {
            console.log(error)
        }
    }   
    getAll = async()=>{
        try {
            if(fs.existsSync(this.fileName)){              
            const data = await fs.promises.readFile(this.fileName, "utf-8")
            if(data){
                const products = JSON.parse(data);    
                return products
            
            }
            return "El archivo no se encuentra"
            
        }        
            
        } catch (error) {
            console.log(error)
        }
        

    }   
    deleteById = async (id)=> {
        try {
            const data = await this.getAll()
            const deleteProduct = data.splice(id-1,1)

            await fs.promises.writeFile(this.fileName, JSON.stringify([data], null, 2));

            return deleteProduct
        } catch (error) {
            console.log(error)
        }
        
    }
    deleteAll = async()=>{
        try {
            const data = await this.getAll()
            await fs.promises.writeFile(this.fileName, JSON.stringify([], null, 2));
        } catch (error) {
            
        }
    }
   
}

const contenedorProductos = new Contenedor("productos");

const producto1 = {

    title: "Remera",
    precio: 2000,
    thumbnail: "https://media1.sistemacontinuo.com.ar/5289/remera-hombre-sublimable.jpg"
}
const producto2 = {

    title: "Pantalon",
    precio: 3000,
    thumbnail: "https://media.istockphoto.com/photos/mens-trousers-picture-id510615049?k=20&m=510615049&s=612x612&w=0&h=V2qWdnou1w6ctJnfiRlYxQp6QwgX8yRMBBOCMxm7ei0="
}
const producto3 = {

    title: "Gorra",
    precio: 1000,
    thumbnail: "https://imagenes.elpais.com/resizer/qzkDXlLmWSlk6fCGa0UjClIKmTg=/1960x0/cloudfront-eu-central-1.images.arcpublishing.com/prisa/YBLG7EP57BAD7N256VY3EK5AVA.png"
}
const crearProducto = async() => {
    await contenedorProductos.save(producto1);
    await contenedorProductos.save(producto2);
    await contenedorProductos.save(producto3);
} 
/* crearProducto();  

const buscarProducto = async() => {
    const productoEncontrado = await contenedorProductos.getById(1)
    console.log(productoEncontrado)
}
 /* buscarProducto(); 

const mostrarTodo = async() => {
    const productosTotal = await contenedorProductos.getAll();
     console.log(productosTotal)
}
mostrarTodo(); 

const borrarProducto = async() => {
    const productoBorrado =  await contenedorProductos.deleteById(1);
    return productoBorrado
} 
/* borrarProducto();  

const borrarTodo = async() => {
    await contenedorProductos.deleteAll();
    console.log("Se borraron todos los productos")
}
borrarTodo(); */



