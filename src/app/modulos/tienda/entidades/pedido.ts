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
