let mongoose = require('mongoose')

let esquemaProducto = new mongoose.Schema({
  //_id       : ObjectID,
  nombre     : String,
  categoria  : String,
  fabricante : String,
  descripcion: String,
  imagen     : String,
  precio     : String,
  existencias: String
})

exports.Producto = mongoose.model('productos', esquemaProducto)