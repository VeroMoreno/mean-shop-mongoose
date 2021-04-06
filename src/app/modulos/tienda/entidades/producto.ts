export class Producto {
  reduce(arg0: (acu: any, articulo: any) => any, arg1: number): void {
    throw new Error('Method not implemented.');
  }
  public constructor(
      public _id         : string = null,
      public nombre      : string = null,
      public categoria   : string = null,
      public fabricante  : string = null,
      public descripcion : string = null,
      public imagen      : string = null,
      public precio      : number = null,
      public existencias : number = null
  ){}
}