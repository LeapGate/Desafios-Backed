const fs = require("fs");

module.exports = class Contenedor{
    constructor(fileName){
        this.fileName = fileName;
    }
    addId(data) {
		const ids = data.map((item) => item.id);
		const maxId = Math.max(...ids);
		let addId = maxId === -Infinity ? 0 : maxId;
		addId++;
		return addId;
	}

    save = async(product) =>{
       try {
            if(fs.existsSync(this.fileName)){

                const data = await fs.promises.readFile(this.fileName, "utf8"); 

                if(data){
                    const products = JSON.parse(data);
                    const id = this.addId(products);
                    const productExists = products.some(item => item.title === product.title);
                    if(productExists){
                        console.log(`El producto ${product.title} ya existe`)
                    }else{
                        const newProduct = {
                            id,  
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
			const contenido = await fs.promises.readFile(this.nameFile, 'utf-8');
			if (contenido) {
				const data = JSON.parse(contenido);
				const newProductList = data.filter((item) => item.id !== id);

				await fs.promises.writeFile(this.nameFile,JSON.stringify(newProductList, null, 2));
				return data.find((item) => item.id === id) || null;
			} else {
				throw new Error('No se encontró ningún producto para borrar');
			}
		} catch (error) {
			console.log(error);
		}
        
    }
    deleteAll = async()=>{
        try {
            const data = await this.getAll()
            await fs.promises.writeFile(this.fileName, JSON.stringify([], null, 2));
        } catch (error) {
            
        }
    }
    updateById = async(id, body)=>{

        try {
			const contenido = await fs.promises.readFile(this.nameFile, 'utf-8');
			if (contenido) {
				const data = JSON.parse(contenido);
				const newArray = data.map((item) =>
					item.id === id ? { ...item, ...body } : item
				);
				await fs.promises.writeFile(this.nameFile,JSON.stringify(newArray, null, 2));
				return newArray.find((item) => item.id === id) || null;
               
			} else {
				throw new Error('No se encontró ningún producto para actualizar');
			}
		
        } catch (error) {
            console.log(error)
        }
    
	}
   
}
