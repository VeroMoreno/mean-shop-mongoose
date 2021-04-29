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

    private subjectPedido:BehaviorSubject<Pedido>
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

        /* this.subjectPedido ahora mismo vale undefined
           !undefined es igual a true, por lo que siempre entra en esta condicion. */
        if(!this.subjectPedido) {
            console.log("!this.subjectPedido", !undefined)
            // Obtenemos la cesta si hubiera
            let cesta = this.sessionService.getItem(this.nombreCesta)
            // que exista cesta o no depende si está almacenada en Local Storage de Application
            if (cesta) {
                // Pero si proto ya tiene FUNCIONES!
                console.log("cesta JSON -", cesta)
                console.log("--- Existe cesta, asi que hago setPrototypeOf")
                /* el objeto se ha creado a partir de un JSON que tenemos en localstorage
                se le ha hecho un parse y no tiene las funciones de la clase pedido
                ponle todas las funciones que están en el modelo. */
                Object.setPrototypeOf(cesta, Pedido.prototype)
                console.log(cesta, "ahora es prototipo")
            } else {
                console.log("--- NO existe cesta, creo nuevo pedido y seteo la cesta")
                cesta = new Pedido()
                cesta.usuario = this.usuario
                // el true es para que lo guarde en localStorage
                this.sessionService.setItem(this.nombreCesta, cesta, true)
            }
            // POR AQUI SIEMPRE ESTÁ PASANDO.
            this.subjectPedido = new BehaviorSubject(cesta)
            console.log("this.subjectPedido", this.subjectPedido)
        }
        return this.subjectPedido
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
        // ??? Cuando paso por este console log las funciones de Pedido ya andan existiendo no lo entiendo.
        console.log("cestaConstructor", cesta)
        if (cesta.constructor != Pedido){
            Object.setPrototypeOf(cesta, Pedido.prototype)
        }
        this.sessionService.setItem(this.nombreCesta, cesta, true)
        // ??? con cesta dentro me deja flipao.
        // Requires an initial value and emits the current value to new subscriber
        // subject necesita siempre el valor actual para el nuevo subscriptor?
        this.subjectPedido.next(cesta)
    }

    public resetCesta():void {
        let cesta = new Pedido()
        cesta.usuario = this.usuario
        this.setCesta(cesta)
    }

    //Esto guarda la cesta EN EL SERVIDOR
    public guardarCesta(cesta:Pedido):Observable<any>{
        let observable = null
        if(!cesta._id){
            console.log("♥♥♥♥♥♥♥♥♥♥♥ INSERTARCESTA")
            observable = this.insertarCesta(cesta)
        } else {
            console.log("♥♥♥♥♥♥♥♥♥♥♥ MODIFICARCESTA")
            observable = this.modificarCesta(cesta)
        }
        return observable
    }

    public insertarCesta(cesta:Pedido):Observable<any>{
        console.log("insertarCesta cesta", cesta)
        // router.post("/pedidos", insertarPedido)
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
        // router.put("/pedidos/:id", modificarPedido)
        return this.httpClient.put(ConfiguracionUtil.urlServidor + "/pedidos/" + cesta._id, cesta)
    }

    public listarCestas():Observable<any> {
        // router.get("/usuarios/:idUsuario/pedidos", listarPedidosUsuario)
        return this.httpClient.get(ConfiguracionUtil.urlServidor+`/usuarios/${this.usuario._id}/pedidos`)
    }

    public borrarCesta() {
    }

    // depois...
    public seleccionarCesta() {
    }
}