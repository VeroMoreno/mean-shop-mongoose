let mongoose = require("mongoose")

let esquemaCategoria = new mongoose.Schema({
    //Si queremos que sea el driver el que le de valor al _id
    //no lo añadiremos al esquema
    _id         : Number,
	nombre      : String,
	descripcion : String,
	imagen      : String,
})

exports.Categoria = mongoose.model('categorias', esquemaCategoria)