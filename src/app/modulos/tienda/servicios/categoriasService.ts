import { Observable } from "rxjs";
import { ConfiguracionUtil } from "src/app/util/configuracionUtil";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CriterioBusquedaProducto } from "../entidades/criterioBusquedaProducto";


@Injectable({ providedIn: 'root' })
export class CategoriasService {

    constructor(private httpClient:HttpClient) {
    }
    // criterio:CriterioBusquedaProducto FALTA ESTO
    public listarCategorias():Observable<any> {
      return this.httpClient.get(ConfiguracionUtil.urlServidor + "/categorias")
    }
}