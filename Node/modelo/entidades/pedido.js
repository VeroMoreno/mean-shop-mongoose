const ObjectID = require("bson").ObjectID
let mongoose = require('mongoose')
let Producto = require('./producto').Producto

let esquemaPedido = new mongoose.Schema({
  _id       : ObjectID,
  codigo   : String,
  fecha    : String,
  estado   : String,
  total    : Number,
  dirEntrega: String,
  formaPago : String,
  fechaEntrega: String,
  // Si queremos un subconjunto de las propiedades
  usuario: {
   //  _id       : ObjectID,
    login     : String,
    // pw        : String,
    // rol       : String,
    nombre    : String,
    direccion : String,
    telefono  : String,
    correoE   : String,
    idioma    : String
  },
  detalles: [{
    cantidad  : Number,
    precio    : Number,
    producto  : Producto.schema
  }]
})

exports.Pedido = mongoose.model('pedidos', esquemaPedido)