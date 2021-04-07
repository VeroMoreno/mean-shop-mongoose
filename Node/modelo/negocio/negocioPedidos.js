const Pedido = require("../entidades/pedido").Pedido

exports.insertarPedido = (pedido) => { // autoridad
  return new Promise((resolve, reject) => {
    /*if (autoridad.rol != 'ADMIN') {
        reject({ codigo: 403, mensaje: "Solo los administradores pueden insertar productos" });
    }*/
    delete pedido._id
    if(pedido.detalles.length) {
      reject({ codigo:400, mensaje: "Este pedido no tiene detalles" })
        return
    }
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