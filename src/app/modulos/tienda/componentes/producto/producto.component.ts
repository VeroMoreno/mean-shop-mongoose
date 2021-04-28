import { Component, Input, OnInit } from '@angular/core';
import { Pedido } from '../../entidades/pedido';
import { Producto } from '../../entidades/producto';
import { CestaService } from '../../servicios/cestaService';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html'
})
export class ProductoComponent implements OnInit {
  // este componente recibe el valor "producto" via selector
  @Input()
  public producto:Producto = new Producto()
  // ???
  /*
    public: Es el modificador por defecto. Esto es así porque Javascript
    no tiene estos modificadores y todo es público,
    así que por consistencia es normal que sea el valor por defecto.

    private: Los elementos (atributos y métodos) sólo
    son visibles dentro de la clase.

    protected: Los elementos sólo son visibles dentro de la clase
    y en las clases que hereden directamente de ésta.
 */
  private cesta:Pedido

  constructor(private cestaService:CestaService) {
    // console.log("estoy creando el producto para getCesta")
    this.cestaService
    .getCesta() //Devuelve el subject
    .subscribe( cesta => this.cesta = cesta ) //Se subscribe al subject
  }

  ngOnInit(): void {
    // console.log(this.producto)
  }

  public comprar():void {
    // obtener la cesta de cestaservice
    // añadir un detalle a la cesta que incluya el producto
    // la cantidad será 1
    // el precio será de catalogo

    //En nuestra aplicación es la cesta, el pedido, el que sabe trabajar con los detalles
    this.cesta.addProducto(1, this.producto)
    this.cestaService.setCesta(this.cesta)
  }
}
