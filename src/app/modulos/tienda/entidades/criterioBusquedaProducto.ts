export class CriterioBusquedaProducto {
  public constructor(
      public texto      : string = null,
      public categoria  : number = null,
      public fabricante : string = null,
      public precioMin  : string = null,
      public precioMax  : string = null,
  ) {}
}
