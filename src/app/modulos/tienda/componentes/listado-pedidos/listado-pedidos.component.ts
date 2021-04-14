import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../entidades/pedido';
import { CestaService } from '../../servicios/cestaService';

@Component({
  selector: 'app-listado-pedidos',
  templateUrl: './listado-pedidos.component.html'
})
export class ListadoPedidosComponent implements OnInit {

  public pedidos:Pedido[]

  constructor(private cestaService:CestaService) {
    this.listarPedidos()
  }

  ngOnInit(): void {
  }

  public listarPedidos():void {
    this.cestaService.listarCestas()
    .subscribe(
      pedidos => this.pedidos = pedidos,
      error => console.log(error)
    )
  }

  public seleccionarCesta(pedido:Pedido):void{
    this.cestaService.setCesta(pedido)
  }

}
