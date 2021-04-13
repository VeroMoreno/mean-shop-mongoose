import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modulos/usuarios/entidades/usuario'
import { AutenticacionService } from 'src/app/modulos/usuarios/servicios/autenticacionService';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  public usuario:Usuario
  public mensaje:string

  constructor(
    private autenticacionService:AutenticacionService,
    private router:Router,
    ) {
    console.log("creando LOGIN COMPONENT")
    this.usuario = new Usuario()
}

  ngOnInit(): void {
  }

  public entrar():void {
    this.autenticacionService.login(this.usuario)
    .subscribe(
      () => {
        this.router.navigateByUrl("/tienda/catalogo")
      },
      error => {
        console.log(error)
        this.mensaje = "Credenciales incorrectas"
      }
    )
  }

}
