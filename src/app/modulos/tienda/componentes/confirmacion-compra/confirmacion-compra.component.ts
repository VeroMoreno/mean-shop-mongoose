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
    // this.cesta = cestaService.getCesta()
    /* El que quiere la cesta recibe un BehavieurSubject al que se suscribe
    para ir recibiendo la cesta cada vez que cambie */
    cestaService
    .getCesta()
    .subscribe(
      cesta => this.cesta = cesta
    )
  }

  ngOnInit(): void {
  }

  public confirmarCompra():void {

  }

}
