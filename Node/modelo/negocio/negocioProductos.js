const validadorUtil = require('../../util/validadorUtil')
const Producto = require("../entidades/producto").Producto

let reglasProd = {
  nombre     : 'required',
  categoria  : 'required',
  fabricante : 'required',
  descripcion: 'required',
  imagen     : 'required',
  precio     : 'required | min:0',
  existencias: 'required | min:0'
}

let reglasProdModificacion = {
  nombre     : 'required',
  categoria  : 'required',
  fabricante : 'required',
  descripcion: 'required',
  imagen     : 'required',
  precio     : 'required | min:0',
  existencias: 'required | min:0'
}

exports.insertarProducto = (producto, autoridad) => {
  return new Promise((resolve, reject) => {
    if (autoridad.rol != 'ADMIN') {
      reject({ codigo: 403, mensaje: "Solo los administradores pueden insertar productos" });
  }

    delete producto._id
    if(!validadorUtil.validarObjeto(producto, reglasProd, reject)){
        return
    }

    let productoMG = new Producto(producto)
    productoMG
    .save()
    .then(productoInsertado => {
      resolve(productoInsertado)
    })
    .catch(error => {
      console.log(error)
      reject({ codigo:500, mensaje: 'Error con la bbdd!'})
    })
  })
}

exports.listarProductos = function(criterio){
  return new Promise(function(resolve, reject){
      //revisar el criterio y adaptarlo a las necesidades de MongoDB...
      Producto.find( /*criterio*/ )
      .then( listadoProductos => resolve(listadoProductos))
      .catch( error => {
          console.log(error)
          reject({ codigo:500, mensaje:'¡Error en la base de datos!'})
      })
  })
}