const fs = require("fs");

module.exports = class Contenedor{
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
