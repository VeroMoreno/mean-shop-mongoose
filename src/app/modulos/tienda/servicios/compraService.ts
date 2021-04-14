import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ConfiguracionUtil } from "src/app/util/configuracionUtil";
import { Injectable } from "@angular/core";
import { Pedido } from "../entidades/pedido";

@Injectable({ providedIn: 'root' })
export class ComprasService {

  public constructor(private httpClient:HttpClient) {
    console.log("creando compraservice")
  }

  public comprar(cesta:Pedido):Observable<any> {
    return this.httpClient.post(ConfiguracionUtil.urlServidor + '/ordenes_compra', cesta)
  }
}