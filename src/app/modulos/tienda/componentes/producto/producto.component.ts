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

  constructor(private cestaService:CestaService) { }

  ngOnInit(): void {
  }

  public comprar():void {
    // obtener la cesta de cestaservice
    // añadir un detalle a la cesta que incluya el producto
    // la cantidad será 1
    // el precio será de catalogo
    let cesta:Pedido = this.cestaService.getCesta()
        //Esto es una putisima mierda
    //let detalle:DetallePedido = new DetallePedido(1, this.producto.precio, this.producto)
    //cesta.detalles.push(detalle)

    //En nuestra aplicación es la cesta, el pedido, el que sabe trabajar con los detalles
    cesta.addProducto(1, this.producto)
  }

}
