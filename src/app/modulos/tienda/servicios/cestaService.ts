//Este servicio se encargará de proporcionar un pedido a todos los componentes

import { Injectable } from "@angular/core";
import { SessionService } from "src/app/servicios/sessionService";
import { AutenticacionService } from "../../usuarios/servicios/autenticacionService";
import { Pedido } from "../entidades/pedido";

//que estén relacionados con la cesta/carrito de la compra
@Injectable({ providedIn: 'root' })
export class CestaService {

    public constructor(private sessionService:SessionService, private autenticacionService:AutenticacionService) {

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
}