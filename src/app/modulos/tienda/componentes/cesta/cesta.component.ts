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
    this.cesta = cestaService.getCesta()
  }

  ngOnInit(): void {
  }

  public vaciarCesta():void {
    this.cesta.vaciarCesta()
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
    this.router.navigateByUrl("/tienda/compra")
  }

}
