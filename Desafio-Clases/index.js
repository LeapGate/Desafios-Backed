class Usuario{
    constructor(nombre,apellido,libros,mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }
    nombreCompleto(){
        let nombreCompleto = `${this.nombre} ${this.apellido}`
        return nombreCompleto
    }
    agregarMascota(mascota){
        this.mascotas.push(mascota)
    }
    contarMascotas(){
       let cantidad = this.mascotas.length
       return cantidad
    }
    agregarLibro(titulo,autor){
        let nuevoLibro = {titulo:titulo, autor:autor};
        this.libros.push(nuevoLibro)
    }
    recibirLibros(){
        let nombreLibros = this.libros.map(x => x.titulo)
        return nombreLibros
    }

}

const usuario1 = new Usuario("Jorge", "Guitierrez", [{ titulo : "Harry Potter", autor: "JK Rowlin"}], ["Gato", "Perro"])

usuario1.agregarMascota("Pato")
usuario1.agregarLibro("Señor de los anillos", "Stephen Kings")

console.log(usuario1.nombreCompleto())
console.log(usuario1.contarMascotas())
console.log(usuario1.recibirLibros())

