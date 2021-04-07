import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../entidades/pedido';
import { CestaService } from '../../servicios/cestaService';

@Component({
  selector: 'app-confirmacion-compra',
  templateUrl: './confirmacion-compra.component.html'
})
export class ConfirmacionCompraComponent implements OnInit {

  public cesta:Pedido

  constructor(private cestaService:CestaService) {
    this.cesta = cestaService.getCesta()
  }

  ngOnInit(): void {
  }

  public confirmarCompra():void {

  }

}
