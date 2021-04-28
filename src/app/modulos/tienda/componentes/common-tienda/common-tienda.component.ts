import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/modulos/usuarios/servicios/autenticacionService';

@Component({
  selector: 'app-common-tienda',
  templateUrl: './common-tienda.component.html'
})
export class CommonTiendaComponent implements OnInit {

  constructor(private autenticacionService:AutenticacionService, private router:Router) {
    if (!autenticacionService.getUsuario()) {
      router.navigateByUrl("/usuarios/login")
    }
    // en izq solo existe el componente barraIzq y en der solo existe el componente resumenCesta, si pones otro que no exista, no va a funcionar!!!
    router.navigate([
      "/tienda",
      {
        outlets : {
          //clave: nombre del router outlet
          //valor: ruta a aplicar
          'primary' : ['catalogo'],
          'izq'     : ['barraIzq'],
          'der'     : ['resumenCesta']
        }
      }
    ], { skipLocationChange : true })
  }

  ngOnInit(): void {
  }

}
