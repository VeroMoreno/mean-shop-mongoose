let mongoose = require("mongoose")
const { ObjectID } = require("bson")

let esquemaProducto = new mongoose.Schema({
    //Si queremos que sea el driver el que le de valor al _id
    //no lo añadiremos al esquema
    //_id       : ObjectID,
	nombre      : String,
	categoria   : {
		_id       : Number,
		nombre    : String
	},
	fabricante  : String,
	descripcion : String,
	imagen      : String,
	precio      : Number,
	existencias : Number
})

exports.Producto = mongoose.model('productos', esquemaProducto)