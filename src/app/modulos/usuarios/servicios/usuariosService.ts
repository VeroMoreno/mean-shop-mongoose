import { Injectable } from "@angular/core"
import { Usuario } from '../entidades/usuario'
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { ConfiguracionUtil } from "../../../util/configuracionUtil"
import { SessionService } from "../../../servicios/sessionService"

//providedIn: root, inyecta de manera automatica para que pueda usar ese servicio en otros ficheros
@Injectable({ providedIn: 'root' })
export class UsuariosService {

  public constructor(
    private httpClient:HttpClient,
    private sessionService:SessionService) {
      console.log("cargando usuarios Service")
  }

  comprobarLogin(login: string):Observable<any> {
    return this.httpClient.get(ConfiguracionUtil.urlServidor + "/comprobarLogin?login=" + login)
  }

  public altaUsuario(usuario:Usuario):Observable<any> {
    return this.httpClient.post(ConfiguracionUtil.urlServidor + "/usuarios", usuario)
  }

  /* POST /usuarios/:id
  CT: app/json
  Authorization: Bearer ghgfruigh5487hgurgh.fj5r3ughre8hy34.hf4f3uilhf249p7
  ---------------------------
  { usuario } */
  public modificarUsuario(usuario:Usuario):Observable<any> {
    //Podemos añadir a mano el header authorization
    //El problema es que tendremos que hacerlo en 20.000 sitios
    //Mucho mejor que lo haga un INTERCEPTOR --> ../interceptor/interceptorJWT.ts
    /*
    let opciones = {
        headers : {
            Authorization : "Bearer "+this.sessionService.getItem("JWT")
        }
    }
    */
    return this.httpClient.put(ConfiguracionUtil.urlServidor + "/usuarios/" + usuario._id, usuario)
  }

  public bajaUsuario():void {
  }
}