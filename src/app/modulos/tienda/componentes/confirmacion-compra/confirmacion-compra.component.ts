import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../entidades/pedido';
import { CestaService } from '../../servicios/cestaService';
import { ComprasService } from '../../servicios/compraService';
@Component({
  selector: 'app-confirmacion-compra',
  templateUrl: './confirmacion-compra.component.html',
})
export class ConfirmacionCompraComponent implements OnInit {

  public cesta:Pedido
  public mensaje:string
  public mensajeError:string

  constructor(private cestaService:CestaService,
              private compraService:ComprasService) {
    // this.cesta = cestaService.getCesta()
    /* El que quiere la cesta recibe un BehavieurSubject al que se suscribe
    para ir recibiendo la cesta cada vez que cambie */
    cestaService
    .getCesta() //devuelve el subject
    .subscribe( cesta => this.cesta=cesta ) //nos subscribimos
  }

  ngOnInit(): void {
  }

  public confirmarCompra():void {
    this.compraService.comprar(this.cesta)
    .subscribe(
      respuesta => {
        this.mensaje = respuesta.mensaje
        this.mensajeError = null
      },
      error => this.mensajeError = error.error.mensaje
    )
  }
}
