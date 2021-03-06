import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from '../../entidades/pedido';
import { CestaService } from '../../servicios/cestaService';

@Component({
  selector: 'app-cesta',
  templateUrl: './cesta.component.html'
})
export class CestaComponent implements OnInit {

  public cesta:Pedido
  public mensaje:string = ""

  constructor(private cestaService:CestaService, private router:Router) {
    // asi era antes --> this.cesta = cestaService.getCesta()
    /* El que quiere la cesta recibe un BehaviorSubject al que se suscribe
    para ir recibiendo la cesta cada vez que cambie */
    cestaService
    .getCesta()
      .subscribe( cesta => {
        console.log("Recibiendo una nueva cesta en CestaComponent")
        this.cesta = cesta
      })
  }

  ngOnInit(): void {
  }

  public guardar():void {
    if (this.cesta.detalles.length == 0) {
      console.log("no hay detalles!")
      this.mensaje = "No hay detalles en la cesta"
      return
    }
    this.cestaService.guardarCesta(this.cesta)
    .subscribe(
      () => {
        console.log("cesta guardada")
      },
      error => this.mensaje = error.mensaje
    )
  }

  public comprar():void {
    if (this.cesta.detalles.length == 0) {
      console.log("no hay detalles!")
      this.mensaje = "No hay detalles en la cesta"
      return
    }

    this.router.navigate([
      "/tienda",
      {
        outlets : {
          'primary' : ['compra'],
          'der'     : ['resumenCesta']
        }
      }
    ], { skipLocationChange : true })
  }

  public vaciarCesta():void {
    this.cestaService.resetCesta()
  }
}