//Este servicio se encargará de proporcionar un pedido a todos los componentes

import { Injectable } from "@angular/core";
import { SessionService } from "src/app/servicios/sessionService";
import { AutenticacionService } from "../../usuarios/servicios/autenticacionService";
import { Pedido } from "../entidades/pedido";
import { HttpClient } from "@angular/common/http";
import { ConfiguracionUtil } from "src/app/util/configuracionUtil";
import { Observable } from "rxjs";

//que estén relacionados con la cesta/carrito de la compra
@Injectable({ providedIn: 'root' })
export class CestaService {

    public constructor(private sessionService:SessionService,
        private autenticacionService:AutenticacionService,
        private httpClient:HttpClient) {

    }
    public getCesta():Pedido {
        let usuario =  this.autenticacionService.getUsuario()
        let nombreCesta  ='cesta_' + usuario._id
        // la Cesta estará en SessionService
        let cesta = this.sessionService.getItem(nombreCesta)
        // Debemos añadir a la cesta las funciones que le faltan!
        if (cesta) {
            console.log("la cesta ya existe")
            Object.setPrototypeOf(cesta, Pedido.prototype)
        } else {
            // creamos un pedido y lo guardamos en el sesssionservice especificando persistente == true
            console.log("creando la cesta")
            cesta = new Pedido()
            cesta.usuario = usuario

            // let nombreCesta = "cesta_" + this.autenticacionService.getUsuario()._id

            this.sessionService.setItem(nombreCesta, cesta, true)
        }
        return cesta
    }

    //Esto guarda la cesta en el LOCAL STORAGE
    public setCesta(cesta) {
        let usuario = this.autenticacionService.getUsuario()
        let nombreCesta = "cesta_" + usuario._id
        this.sessionService.setItem(nombreCesta, cesta, true)
    }

    //Esto guarda la cesta EN EL SERVIDOR
    public guardarCesta(cesta:Pedido):Observable<any>{
        let observable = null
        if(!cesta._id){
            observable = this.insertarCesta(cesta)
        } else {
            observable = this.modificarCesta(cesta)
        }
        return observable
    }

    public insertarCesta(cesta:Pedido):Observable<any>{
        return new Observable( subscribers => {
            this.httpClient.post(ConfiguracionUtil.urlServidor+"/pedidos", cesta)
            .subscribe(
                cestaInsertada => {
                    //sustituir la cesta del localStorage por esta que tiene id
                    this.setCesta(cestaInsertada)
                    subscribers.next()
                    subscribers.complete()
                },
                error => {
                    subscribers.error(error)
                    subscribers.complete()
                }
            )
        })
    }

    public modificarCesta(cesta:Pedido):Observable<any>{
        return this.httpClient.put(ConfiguracionUtil.urlServidor + "/pedidos/" + cesta._id, cesta)
    }

    public listarCesta() {
    }

    public borrarCesta() {
    }

    // depois...
    public seleccionarCesta() {
    }
}