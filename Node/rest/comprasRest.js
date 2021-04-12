const express = require("express")
const negocioCompras = require("../modelo/negocio/negocioCompras")

let router = express.Router()

router.post("/ordenes_compra", comprar)
//Esa podría utilizarse para cancelar una compra, si esta dentro del margen de tiempo
//router.delete("/ordenesCompra/:id", cancelarCompra)

exports.router = router

function comprar(request, response) {
    let pedido = request.body
    negocioCompras.comprar(pedido, request.autoridad)
    .then( respuesta => response.json(respuesta) )
    .catch( error => {
        response.statusCode = error.codigo
        response.json(error)
    })
}


