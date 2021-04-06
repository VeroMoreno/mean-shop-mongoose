import { Producto } from './producto'

export class DetallePedido {
  public constructor(
      public cantidad : number = null,
      public precio   : number = null,
      public producto : Producto = null,
  ) {}
}
