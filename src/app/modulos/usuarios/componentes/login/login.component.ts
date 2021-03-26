import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modulos/usuarios/entidades/usuario'
import { AutenticacionService } from 'src/app/modulos/usuarios/servicios/autenticacionService';
import { SessionService } from 'src/app/servicios/sessionService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  public login:string
  public pw:string
  public usuario:Usuario
  public mensaje:string

  constructor(
    private autenticacionService:AutenticacionService,
    private router:Router,
    private sessionService:SessionService) {
this.usuario = new Usuario()
}

  ngOnInit(): void {
  }

  public entrar():void {
    this.autenticacionService.login(this.usuario)
    .subscribe(
      () => {
        this.router.navigateByUrl("/tienda/perfil")
      },
      error => {
        console.log(error)
        this.mensaje = "Credenciales incorrectas"
      }
    )
  }

}
