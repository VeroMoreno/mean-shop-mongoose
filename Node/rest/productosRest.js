const express = require("express")
const negocioProductos = require("../modelo/negocio/negocioProductos")

let router = express.Router()

router.get("/productos", listarProductos)
router.get("/productos/:id", buscarProducto)
router.post("/productos", insertarProducto)
router.put("/productos/:id", modificarProducto)
router.delete("/productos", borrarProducto)

exports.router = router

function listarProductos(request, response) {
  let criterio = request.query.criterio
  negocioProductos.listarProductos(criterio)
  .then(listadoProductos => response.json(listadoProductos))
  .catch(error => {
    response.statusCode = error.codigo
    response.json(error)
  })
}

function buscarProducto(request, response){
  let id = request.params.id
  negocioProductos.buscarProducto(id)
  .then( producto => response.json(producto))
  .catch( error => {
      response.statusCode = error.codigo
      response.json(error)
  })
}

function insertarProducto(request, response) {
  let producto = request.body
  // Solo se puede enviar si el tipo de autoridad es ADMIN
  negocioProductos.insertarProducto(producto, request.autoridad)
  .then(productoInsertado => {
      response.statusCode = 201;
      response.json(productoInsertado)
  })
  .catch(error => {
    console.log(error)
      response.statusCode = error.codigo
      response.json(error)
  })
}

function modificarProducto(request, response) {
      /*
    let idProducto = request.params.id
    let producto = request.body
    producto._id = idProducto
    negocioProductos.modificarProducto(producto, request.autoridad)
    .then( productoModificado => {
        response.json(productoModificado)
    })
    .catch( error => {
        response.statusCode = error.codigo
        response.json(error)
    })
    */
}

function borrarProducto(request, response) {}