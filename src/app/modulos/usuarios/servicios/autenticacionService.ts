import { Observable } from "rxjs";
import { Usuario } from 'src/app/modulos/usuarios/entidades/usuario'
import { SessionService } from "../../../servicios/sessionService";
import { HttpClient } from "@angular/common/http";
import { ConfiguracionUtil } from "../../../util/configuracionUtil";
import { Injectable } from "@angular/core";
import { UsuariosService } from "./usuariosService";

@Injectable({ providedIn : 'root' })
export class AutenticacionService {
    public constructor(private httpClient:HttpClient,
    private sessionService:SessionService,
    private usuariosService:UsuariosService) {
}

public getUsuario():Usuario {
    return this.sessionService.getItem("usuario")
}

public getJWT():string {
    return this.sessionService.getItem("JWT")
}

    public login(usuario:Usuario):Observable<any>{

        return new Observable( suscribirme => {
            // ???
            let observable:Observable<any> = this.httpClient.post(ConfiguracionUtil.urlServidor+"/login", usuario)
            observable.subscribe(
                data => {
                    console.log("datadata", data)
                    this.sessionService.setItem("JWT",data.JWT)
                    this.sessionService.setItem("usuario",data.usuario)
                    suscribirme.next()
                    suscribirme.complete()
                },
                error => {
                    suscribirme.error(error)
                    suscribirme.complete()
                }
            )
        })
    }

    public logout():void {
        // se elimina jwt y usuario
        this.sessionService.clear()
    }

    public modificarUsuario(usuario:Usuario):Observable<any> {
        // enviar peticion put, sustituir el usuario antiguo por el nuevo en el sessionService
        return new Observable( subscriber =>  {
            this.usuariosService.modificarUsuario(usuario)
            .subscribe(
                data => {
                    this.sessionService.setItem("usuario", usuario)
                    subscriber.next()
                    subscriber.complete()
                },
                error => {
                    console.log("error autenticacion", error)
                    subscriber.error(error)
                    subscriber.complete()
                }
            )
        })
    }
}