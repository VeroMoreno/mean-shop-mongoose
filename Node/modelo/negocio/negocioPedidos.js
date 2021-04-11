const Pedido = require("../entidades/pedido").Pedido

exports.insertarPedido = (pedido, autoridad) => { // autoridad
  return new Promise((resolve, reject) => {
    if(autoridad.rol == "CLIENTE" && (pedido.usuario_.id != autoridad._id)){
      reject({ codigo:403, mensaje: 'Solo los clientes pueden insertar pedidos'})
      return
    }
    if(!pedido.detalles || !Array.isArray(pedido.detalles) || pedido.detalles.length == 0) {
      reject({ codigo:400, mensaje: "Este pedido no tiene detalles" })
      return
    }
    delete pedido._id
    // le asignamos un codigo y la fecha
    pedido.codigo = Math.round(Data.now()/1000)
    pedido.fecha = Date.now()

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

// cualquiera puede modificar pedidos, pero si es un cliente solo podrá modificar los suyos.
exports.modificarPedido = (pedido, autoridad) => {
  return new Promise((resolve, reject) => {
    if (autoridad.rol == "CLIENTE" && (pedido.usuario_.id != autoridad._id)) {
      reject({ codigo:403, mensaje: 'Solo los clientes pueden modificar sus pedidos'})
      return
    }
    // como vamos a dejar modificar un pedido sin detalles?
    if (!pedido.detalles || !Array.isArray(pedido.detalles) || pedido.detalles.length == 0) {
      reject({ codigo:403, mensaje: 'Este pedido no tiene detalles!'})
      return
    }
    Pedido.findByIdAndUpdate(pedido._id, pedido)
    .then(pedidoModificado => {
      if (!pedidoModificado) {
        reject({ codigo:404, mensaje:"No existe un pedido con ese id" + pedido._id})
        return
      }
      resolve(pedidoModificado)
    })
    .catch( error => {
      console.log(error)
      reject({ codigo:500, mensaje:'Database error!'})
    })
  })
}

exports.listarPedidosUsuario = (id, autoridad) => {
  return new Promise((resolve, reject) => {
    console.log("id", id)
    console.log("autoridad", autoridad)
    if (id != autoridad._id) {
      reject({ codigo:403, mensaje: 'Los clientes solo pueden ver sus pedidos'})
      return
    }
    Pedido.find({ "usuario._id" : id})
    .then(listadoPedidos => resolve(listadoPedidos))
    .catch( error => {
      console.log(error)
      reject({ codigo:500, mensaje:'Database error!'})
    })
  })
}