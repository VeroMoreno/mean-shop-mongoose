const express = require("express")
const negocioPedidos = require("../modelo/negocio/negocioPedidos")

let router = express.Router()

router.get("/usuarios/:idUsuario/pedidos", listarPedidosUsuario)
router.post("/pedidos", insertarPedido)
router.put("/pedidos/:id", modificarPedido)
/*
router.get("/usuarios/x/pedidos", listarPedidos) // listar pedidos ADMIN
router.get("/pedidos/:id", buscarPedido)
router.delete("/pedidos", borrarPedido) */

exports.router = router

function insertarPedido(request, response) {
  let pedido = request.body
  negocioPedidos.insertarPedido(pedido, request.autoridad)
  .then(pedidoInsertado => {
      response.statusCode = 201;
      response.json(pedidoInsertado)
  })
  .catch(error => {
    console.log(error)
      response.statusCode = error.codigo
      response.json(error)
  })
}

function modificarPedido(request, response) {
  let pedido = request.body
  let { id } = request.params
  pedido._id = id
  negocioPedidos.modificarPedido(pedido, request.autoridad)
  .then(pedidoModificado => {
      console.log("modificarPedido rest --> el pedidio ha sido modificado!")
      response.statusCode = 201;
      response.json(pedidoModificado)
  })
  .catch(error => {
    console.log("modificarPedido", error)
      response.statusCode = error.codigo
      response.json(error)
  })
}

function listarPedidosUsuario(request, response) {
  let idUsuario = request.params.idUsuario
  // NO ME LLEGA EL ID
  console.log("idusuario REST", idUsuario)
  negocioPedidos.listarPedidosUsuario(idUsuario, request.autoridad)
  .then(pedidos => {
    console.log("listarPedidosUsuario rest --> pedidos listados!")
    response.statusCode = 201;
    response.json(pedidos)
  })
  .catch(error => {
    console.log("listarPedidosUsuario", error)
      response.statusCode = error.codigo
      response.json(error)
  })
}