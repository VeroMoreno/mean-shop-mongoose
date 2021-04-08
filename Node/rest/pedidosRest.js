const express = require("express")
const negocioPedidos = require("../modelo/negocio/negocioPedidos")

let router = express.Router()

router.post("/pedidos", insertarPedido)
/* router.get("/pedidos?id=x", listarPedidos)
router.get("/usuarios/x/pedidos", listarPedidos) // listar pedidos ADMIN
router.get("/pedidos/:id", buscarPedido)
router.put("/pedidos/:id", modificarPedido)
router.delete("/pedidos", borrarPedido) */

exports.router = router

function insertarPedido(request, response) {
  let pedido = request.body
  console.log("pedido rest", pedido)
  negocioPedidos.insertarPedido(pedido)
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