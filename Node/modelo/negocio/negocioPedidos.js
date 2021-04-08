const Pedido = require("../entidades/pedido").Pedido

exports.insertarPedido = (pedido) => { // autoridad
  return new Promise((resolve, reject) => {
    /*if (autoridad.rol != 'ADMIN') {
        reject({ codigo: 403, mensaje: "Solo los administradores pueden insertar productos" });
    }*/
    if(pedido.detalles.length == 0) {
      reject({ codigo:400, mensaje: "Este pedido no tiene detalles" })
        return
    }
    delete pedido._id
    let pedidoMG = new Pedido(pedido)
    pedidoMG.save()
    .then(pedidoInsertado => {
      resolve(pedidoInsertado)
    })
    .catch(error => {
      console.log(error)
      reject({ codigo:500, mensaje: 'Error con la bbdd!'})
    })
  })
}