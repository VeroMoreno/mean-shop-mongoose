//Este servicio se encargará de proporcionar un pedido a todos los componentes

import { Injectable } from "@angular/core";
import { SessionService } from "src/app/servicios/sessionService";
import { AutenticacionService } from "../../usuarios/servicios/autenticacionService";
import { Pedido } from "../entidades/pedido";
import { HttpClient } from "@angular/common/http";
import { ConfiguracionUtil } from "src/app/util/configuracionUtil";
import { BehaviorSubject, Observable } from "rxjs";
import { Usuario } from "../../usuarios/entidades/usuario";

//que estén relacionados con la cesta/carrito de la compra
@Injectable({ providedIn: 'root' })
export class CestaService {

    private subject:BehaviorSubject<Pedido>
    private nombreCesta:string
    private usuario:Usuario

    public constructor( private sessionService:SessionService,
                        private autenticacionService:AutenticacionService,
                        private httpClient:HttpClient) {
        this.usuario = this.autenticacionService.getUsuario()
        this.nombreCesta = "cesta_" + this.usuario._id
    }

    public getCesta():BehaviorSubject<Pedido> {
        // let usuario =  this.autenticacionService.getUsuario()
        // let nombreCesta  = 'cesta_' + usuario._id

        //El primero que invoque 'getCesta' disparará:
        //-la creación del subject
        //-la creacion de la cesta
        //-guardar la cesta en el SessionService (local storage)
        //-la emisión del primer evento
        if(!this.subject) {
            let cesta = this.sessionService.getItem(this.nombreCesta)
            if (cesta) {
                /* el objeto se ha creado a partir de un JSON que tenemos en localstorage
                se le ha hecho un parse y no tiene las funciones de la clase pedido */
                Object.setPrototypeOf(cesta, Pedido.prototype)
            } else {
                cesta = new Pedido()
                cesta.usuario = this.usuario
                this.sessionService.setItem(this.nombreCesta, cesta, true)
            }
            this.subject = new BehaviorSubject(cesta)
        }
        return this.subject
        // la Cesta estará en SessionService
        // let cesta = this.sessionService.getItem(nombreCesta)
        // Debemos añadir a la cesta las funciones que le faltan!
        /*if (cesta) {
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
        return cesta*/
    }

    //Esto guarda la cesta en el LOCAL STORAGE
    public setCesta(cesta) {
        this.sessionService.setItem(this.nombreCesta, cesta, true)
        this.subject.next(cesta)
    }

    public nuevaCesta():void {
        let cesta = new Pedido()
        cesta.usuario = this.usuario
        this.setCesta(cesta)
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
        console.log("insertarCesta cesta", cesta)
        return new Observable( subscribers => {
            this.httpClient.post(ConfiguracionUtil.urlServidor + "/pedidos", cesta)
            .subscribe(
                cestaInsertada => {
                    Object.setPrototypeOf(cestaInsertada, Pedido.prototype)
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
        console.log("modificarCesta cesta", cesta)
        return this.httpClient.put(ConfiguracionUtil.urlServidor + "/pedidos/" + cesta._id, cesta)
    }

    public listarCestas():Observable<any> {
        return this.httpClient.get(ConfiguracionUtil.urlServidor+`/usuarios/${this.usuario._id}/pedidos`)
    }

    public borrarCesta() {
    }

    // depois...
    public seleccionarCesta() {
    }
}