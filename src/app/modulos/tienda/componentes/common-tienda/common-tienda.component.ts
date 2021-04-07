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
  }

  ngOnInit(): void {
  }

}
