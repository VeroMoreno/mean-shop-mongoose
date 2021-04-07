import { Usuario } from '../../usuarios/entidades/usuario'
import { DetallePedido } from './detallePedido';
import { Producto } from './producto';

export class Pedido {
  public constructor(
      public _id      : string = null,
      public codigo   : string = null,
      public fecha    : string = null,
      public estado   : string = null,
      public total    : number = null,
      public usuario  : Usuario = null,
      public dirEntrega  : String = null,
      public formaPago   : String = null,
      public fechaEntrega: String = null,
      public detalles : DetallePedido[] = []
  ) {}

  // Funciones
  public addProducto(cantidad:number, producto:Producto) {
    // si hay un detalle con el producto recibido hay que crearlo y añadirlo pero si ya existe hay que combinarlo.
      let detalleEncontrado = this.detalles.find(detalle => detalle.producto._id == producto._id)
      if (detalleEncontrado) {
        detalleEncontrado.cantidad += cantidad
      } else {
        let detalle = new DetallePedido(cantidad, producto.precio, producto)
        this.detalles.push(detalle)
      }
      console.log(this.detalles)
      this.calcularTotal()
  }

  //Disminuye la cantidad de un producto en 1
  //Si no existe el producto en la cesta pues nada, que no falle
  //Si existe y la cantidad queda a 0, que se elimina
  public disminuirCantidad(producto:Producto):void {
    let detalle = this.detalles.find( detalle => {
      return detalle.producto._id == producto._id
    })
    if(!detalle) {
      return
    }
    detalle.cantidad -= 1
    if (detalle.cantidad == 0) {
      this.eliminarDetalle(producto)
    }
    this.calcularTotal
  }

  //Elimina el detalle que contiene el producto recibido
  public eliminarDetalle(producto:Producto) {
    for (let i = 0; i < this.detalles.length; i++) {
      if (this.detalles[i].producto._id == producto._id) {
        this.detalles.splice(i,1)
        this.calcularTotal()
        break
      }
    }
  }

  public vaciarCesta() {
    this.detalles = []
    this.calcularTotal()
  }

  private calcularTotal():void {
    /*return this.detalles.reduce((total, detalle) => {
      return total += detalle.precio * detalle.cantidad;
    }, 0)*/
    let total = 0
    this.detalles.forEach(detalle => total += detalle.precio * detalle.cantidad)
    this.total = total
    // guardar provisional
    localStorage.setItem("cesta_" + this.usuario._id, JSON.stringify(this))
  }
}
